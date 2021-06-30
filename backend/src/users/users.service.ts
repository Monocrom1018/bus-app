import { UserCreateDto } from './dto/user-create.dto';
import { UserSearchDto } from './dto/user-search.dto';
import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersRepository } from './users.repository';
import { Users as User } from './users.entity';

const axios = require('axios');
const qs = require('qs');

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
  ) {}

  async signUp(userCreateDto: UserCreateDto): Promise<string> {
    const user = await this.usersRepository.signUp(userCreateDto);

    if (!user) {
      throw new NotAcceptableException();
    }

    return 'user created';
  }

  async findAll(): Promise<User[]> {
    const users = this.usersRepository.findAll();
    return users;
  }

  async update(filename, userUpdateDto) {
    const user = await this.usersRepository.findOne({
      email: 'test01@bus.com',
    });
    if (!user) {
      return 'Unauthorized';
    }

    user.profile_img = `${process.env.SERVER_ADDRESS}/images/${filename}`;
    user.save();
    return;
  }

  async me(email) {
    const user = await this.usersRepository.me(email);
    return user;
  }

  async findByUuid(uuid: string): Promise<User> {
    const user = this.usersRepository.findByUuid(uuid);
    return user;
  }

  async getOneDriver(param: number): Promise<User> {
    const user = this.usersRepository.getOneDriver(param);
    return user;
  }

  async getInformation() {
    const user = await this.usersRepository.findOne({
      email: 'test01@bus.com',
    });

    return user;
  }

  async getDrivers(params: UserSearchDto) {
    const distance = await this.getDistance(params);

    if (!distance) {
      throw new NotFoundException();
    }

    const drivers = await this.usersRepository.findTargetDrivers(params);
    const departureTime = params.departureDate.split(' ')[4].split(':')[0];

    if (drivers) {
      drivers.map((driver) => {
        const restDistance =
          distance - driver.basic_km > 0 ? distance - driver.basic_km : 0;

        let totalCharge =
          restDistance * driver.charge_per_km +
          driver.basic_charge +
          driver.service_charge;

        if (
          Number(departureTime) >= driver.night_begin ||
          Number(departureTime) <= driver.night_end
        ) {
          totalCharge = totalCharge + driver.night_charge;
        }
        driver['totalCharge'] = totalCharge;
      });
    }

    return { foundDrivers: drivers, calculatedDistance: distance };
  }

  async getDistance(params) {
    const { departure, destination, stopovers } = params;
    const depCoord = { x: '', y: '' };
    const destCoord = { x: '', y: '' };
    let tmapData = '';

    if (stopovers.length > 0) {
      for (let i = 0; i < stopovers.length; i++) {
        if (stopovers[i] === '') {
          return false;
        }
        const stopoverData = await this.getGeoData(stopovers[i].stopover);
        const tmapsGeo = `${stopoverData.data.addresses[0].x},${stopoverData.data.addresses[0].y}_`;
        tmapData = tmapData + tmapsGeo;
      }

      tmapData = tmapData.slice(0, -1);
    }

    const departureData = await this.getGeoData(departure);
    const destinationData = await this.getGeoData(destination);

    depCoord.x = departureData.data.addresses[0].x;
    depCoord.y = departureData.data.addresses[0].y;

    destCoord.x = destinationData.data.addresses[0].x;
    destCoord.y = destinationData.data.addresses[0].y;

    const tmapBody = qs.stringify({
      appKey: process.env.TMAP_API_KEY,
      endX: depCoord.x,
      endY: depCoord.y,
      startX: destCoord.x,
      startY: destCoord.y,
      passList: tmapData,
      searchOption: 10,
      totalValue: 2,
      trafficInfo: 'N',
    });

    const tmapConfig = {
      'Accept-Language': 'ko',
      'Content-Type': 'application/x-www-form-urlencoded',
    };

    const tmapApi = await axios.post(
      'https://apis.openapi.sk.com/tmap/routes?version=1',
      tmapBody,
      tmapConfig,
    );

    const kmData = Math.round(
      tmapApi.data.features[0].properties.totalDistance / 1000,
    );

    return kmData;
  }

  async getGeoData(param) {
    return await axios.get(
      `https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode`,
      {
        headers: {
          'X-NCP-APIGW-API-KEY-ID': process.env.X_NCP_APIGW_API_KEY_ID,
          'X-NCP-APIGW-API-KEY': process.env.X_NCP_APIGW_API_KEY,
        },
        params: {
          query: param,
        },
      },
    );
  }
}
