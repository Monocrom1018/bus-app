import {
  Injectable,
  InternalServerErrorException,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import moment from 'moment';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from '@auth/auth.service';
import axios, { AxiosRequestConfig } from 'axios';
import qs from 'qs';
import { BillingKeyProps, TotalChargeProps } from '@interfaces/index';
import { UserCreateDto } from './dto/user-create.dto';
import { UserSearchDto } from './dto/user-search.dto';
import { UsersRepository } from './users.repository';
import { Users as User } from './users.entity';
import { MonthsService } from '../months/months.service';
import { UserUpdateDto } from './dto/user-update.dto';
// const axios = require('axios');
// const qs = require('qs');

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersRepository)
    private readonly usersRepository: UsersRepository,
    private readonly monthsService: MonthsService,
    private readonly authService: AuthService,
  ) {}

  async signUp(userCreateDto: UserCreateDto): Promise<string> {
    const uuid = await this.authService.sub();
    const user = await this.usersRepository.signUp(userCreateDto, uuid);

    if (!user) {
      throw new NotAcceptableException();
    }

    return 'user created';
  }

  async findAll(): Promise<User[]> {
    const users = this.usersRepository.findAll();
    return users;
  }

  async update(filename: string, userUpdateDto: UserUpdateDto) {
    const user = await this.authService.currentApiUser();
    return this.usersRepository.updateUser(user, filename, userUpdateDto);
  }

  async getBillingKey(body: BillingKeyProps) {
    const { authKey, customerKey } = body;
    const user = await this.me('normal@test.com');

    if (!user) {
      throw new NotFoundException('유저정보가 조회되지 않습니다');
    }

    const encodedKey = Buffer.from(
      `${process.env.TOSS_SECRET_KEY}:`,
      'utf8',
    ).toString('base64');

    const tossData = { customerKey };

    const config: AxiosRequestConfig = {
      method: 'POST',
      url: `https://api.tosspayments.com/v1/billing/authorizations/${authKey}`,
      headers: {
        Authorization: `Basic ${encodedKey}`,
        'Content-Type': 'application/json',
      },
      data: tossData,
    };

    const { data: apiResult } = await axios(config);
    return this.usersRepository.saveBillingKey(apiResult, user);
  }

  async createPayment(body) {
    const { id: reservationId, price } = body;
    const { card_billing_key, uuid, email, name } = body.user;

    const encodedKey = await Buffer.from(
      `${process.env.TOSS_SECRET_KEY}:`,
      'utf8',
    ).toString('base64');

    const tossData = {
      customerKey: uuid,
      amount: price,
      orderId: reservationId,
      customerEmail: email,
      customerName: name,
      orderName: '배낭버스 운행예약',
    };

    const config: AxiosRequestConfig = {
      method: 'POST',
      url: `https://api.tosspayments.com/v1/billing/${card_billing_key}`,
      headers: {
        Authorization: `Basic ${encodedKey}`,
        'Content-Type': 'application/json',
      },
      data: tossData,
    };

    try {
      const { data: apiResult } = await axios(config);
    } catch (error) {
      const { data, status, headers } = error.response;
      console.log(data);
      console.log(status);
      console.log(headers);
    }

    return 'ok';
  }

  async me(email: string): Promise<User> {
    const user = await this.usersRepository.me(email);
    return user;
  }

  async findByUuid(uuid: string): Promise<User> {
    const user = this.usersRepository.findByUuid(uuid);
    return user;
  }

  async getOneDriver(param: number): Promise<User> {
    const user = this.usersRepository.getOneUserById(param);
    return user;
  }

  async getInformation(): Promise<User> {
    const user = await this.usersRepository.findOne({
      email: 'test01@bus.com',
    });

    return user;
  }

  async getDrivers(params: UserSearchDto) {
    const {
      departureDate,
      returnDate,
      stopovers,
      departure,
      destination,
      lastDestination,
      returnStopoverCheck,
    } = params;
    const departureTime = departureDate.split(' ')[4].split(':')[0];
    const departMonth = await this.getMonth(departureDate);
    const returnMonth = await this.getMonth(returnDate);
    const isDepartPeak = await this.monthsService.isPeakMonth(departMonth);
    const isReturnPeak = await this.monthsService.isPeakMonth(returnMonth);
    const drivers = await this.usersRepository.findTargetDrivers(params);
    const distance = await this.getDistance(params);

    const returnDistance = await this.getDistance({
      departure: destination,
      destination: lastDestination === '' ? departure : lastDestination,
      stopovers: returnStopoverCheck ? stopovers.reverse() : [],
    });

    if (!distance || !returnDistance) {
      throw new NotFoundException();
    }

    if (drivers) {
      drivers.forEach(async (driver) => {
        const restDistance =
          distance - driver.basic_km > 0 ? distance - driver.basic_km : 0;

        const departCharge = isDepartPeak
          ? driver.peak_charge || driver.basic_charge
          : driver.basic_charge;

        const departChargePerKm = isDepartPeak
          ? driver.peak_charge_per_km || driver.charge_per_km
          : driver.charge_per_km;

        let departTotalCharge =
          restDistance * departChargePerKm +
          departCharge +
          driver.service_charge;

        // 야간할증 계산
        if (
          Number(departureTime) >= driver.night_begin ||
          Number(departureTime) <= driver.night_end
        ) {
          departTotalCharge += driver.night_charge;
        }

        // 귀환요금 계산
        const returnParams = {
          isReturnPeak,
          returnDistance,
          returnDate,
          driver,
        };
        const returnTotalCharge = await this.getReturnTotalCharge(returnParams);
        const sum = returnTotalCharge + departTotalCharge;

        (driver as any).totalCharge = sum;
      });
    }

    return {
      foundDrivers: drivers,
      calculatedDistance: distance + returnDistance,
    };
  }

  async getReturnTotalCharge(params: TotalChargeProps) {
    const { returnDistance, returnDate, driver, isReturnPeak } = params;
    const returnTime = returnDate.split(' ')[4].split(':')[0];

    const returnChargePerKm = isReturnPeak
      ? driver.peak_charge_per_km || driver.charge_per_km
      : driver.charge_per_km;

    let returnTotalCharge = returnDistance * returnChargePerKm;

    if (
      Number(returnTime) >= driver.night_begin ||
      Number(returnTime) <= driver.night_end
    ) {
      returnTotalCharge += driver.night_charge;
    }
    return returnTotalCharge;
  }

  async getMonth(date: string) {
    return moment(date).format('YYYY년 M월 DD일 HH시 MM분').split(' ')[1];
  }

  async getDistance(params: UserSearchDto) {
    const { departure, destination, stopovers } = params;
    const departureCoord = { x: '', y: '' };
    const destinationCoord = { x: '', y: '' };
    let tmapData = '';

    if (stopovers.length > 0 && stopovers[0].stopover !== '') {
      for (let i = 0; i < stopovers.length; i++) {
        if (stopovers[i].stopover === '') {
          throw new InternalServerErrorException();
        }
        // eslint-disable-next-line no-await-in-loop
        const stopoverData = await this.getGeoData(stopovers[i].stopover);
        const tmapsGeo = `${
          stopoverData.data.coordinateInfo.coordinate[0].lon ||
          stopoverData.data.coordinateInfo.coordinate[0].newLon
        },${
          stopoverData.data.coordinateInfo.coordinate[0].lat ||
          stopoverData.data.coordinateInfo.coordinate[0].newLat
        }_`;
        tmapData += tmapsGeo;
      }

      tmapData = tmapData.slice(0, -1);
    }

    const departureData = await this.getGeoData(departure);
    const destinationData = await this.getGeoData(destination);

    departureCoord.x =
      departureData.data.coordinateInfo.coordinate[0].lon ||
      departureData.data.coordinateInfo.coordinate[0].newLon;
    departureCoord.y =
      departureData.data.coordinateInfo.coordinate[0].lat ||
      departureData.data.coordinateInfo.coordinate[0].newLat;

    destinationCoord.x =
      destinationData.data.coordinateInfo.coordinate[0].lon ||
      destinationData.data.coordinateInfo.coordinate[0].newLon;
    destinationCoord.y =
      destinationData.data.coordinateInfo.coordinate[0].lat ||
      destinationData.data.coordinateInfo.coordinate[0].newLat;

    const tmapBody = qs.stringify({
      appKey: process.env.TMAP_API_KEY,
      endX: departureCoord.x,
      endY: departureCoord.y,
      startX: destinationCoord.x,
      startY: destinationCoord.y,
      passList: tmapData,
      searchOption: 10,
      totalValue: 2,
      trafficInfo: 'N',
    });

    const tmapApiConfig: AxiosRequestConfig = {
      method: 'POST',
      url: 'https://apis.openapi.sk.com/tmap/routes?version=1',
      headers: {
        'Accept-Language': 'ko',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      params: { tmapBody },
    };
    const tmapApi = await axios(tmapApiConfig);
    // const tmapApi = await axios.post(
    //   'https://apis.openapi.sk.com/tmap/routes?version=1',
    //   tmapBody,
    //   tmapConfig,
    // );

    const kmData = Math.round(
      tmapApi.data.features[0].properties.totalDistance / 1000,
    );

    return kmData;
  }

  async getGeoData(param: string) {
    const data = await axios.get(
      'https://apis.openapi.sk.com/tmap/geo/fullAddrGeo',
      {
        params: {
          addressFlag: 'F00',
          version: '1',
          fullAddr: param,
          appKey: process.env.TMAP_API_KEY,
        },
      },
    );
    return data;
  }
}
