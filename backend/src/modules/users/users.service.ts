import {
  ConflictException,
  forwardRef,
  Inject,
  Injectable,
  NotAcceptableException,
} from '@nestjs/common';
import moment from 'moment';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from '@auth/auth.service';
import axios, { AxiosRequestConfig } from 'axios';
import { BillingKeyProps } from '@interfaces/index';
import { ImagesEntity } from '@images/images.entity';
import { ImagesRepository } from '@images/images.repository';
import { BusesRepository } from '@buses/buses.repository';
import { BusesEntity } from '@buses/buses.entity';
import { FilesService } from '@files/files.service';
import { SchedulesService } from '@schedules/schedules.service';
import { UserCreateDto } from './dto/user-create.dto';
import { DriverSearchDto } from './dto/driver-search.dto';
import { UsersRepository } from './users.repository';
import { UsersEntity } from './users.entity';
import { MonthsService } from '../months/months.service';
import { UserUpdateDto } from './dto/user-update.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersRepository)
    private readonly usersRepository: UsersRepository,
    private readonly imagesRepository: ImagesRepository,
    private readonly filesService: FilesService,
    private readonly monthsService: MonthsService,
    private readonly busesRepository: BusesRepository,
    private readonly authService: AuthService,
    @Inject(forwardRef(() => SchedulesService))
    private scheduleService: SchedulesService,
  ) {}

  async signUp(userCreateDto: UserCreateDto): Promise<string> {
    const { files, user_type } = userCreateDto;

    if(user_type === 'DRIVER' && files.length < 2) {
      throw new ConflictException("파일을 모두 첨부해주세요")
    }

    const uuid = await this.authService.sub();
    const user = await this.usersRepository.signUp(userCreateDto, uuid);

    if (!user) {
      throw new NotAcceptableException();
    }

    if (user.user_type === 'driver') {
      await this.filesService.saveFiles(user, files);
    }


    return 'user created';
  }

  async findAll(): Promise<UsersEntity[]> {
    const users = this.usersRepository.findAll();
    return users;
  }

  async update(userUpdateDto: UserUpdateDto) {
    const { profileImg, ...userUpdateColumns } = userUpdateDto;
    const user = await this.authService.currentApiUser();

    if (profileImg && user) {
      const previousProfile = await this.imagesRepository.findOne({
        user,
      });

      if (previousProfile) {
        await this.imagesRepository.update(
          { user },
          {
            ...profileImg,
            user,
            imagable_type: 'user',
            imagable_id: user.id,
          },
        );
      } else {
        await this.imagesRepository.save({
          ...profileImg,
          user,
          imagable_type: 'user',
          imagable_id: user.id,
        });
      }
    }

    const profile: ImagesEntity = await this.imagesRepository.findOne({
      key: profileImg.key,
    });

    const previousBus = await this.busesRepository.findOne({
      user,
    });

    if (!previousBus) {
      await this.busesRepository.save({
        user,
      });
    }

    const bus: BusesEntity = await this.busesRepository.findOne({
      user,
    });

    return this.usersRepository.updateUser(
      user,
      userUpdateColumns,
      profile,
      bus,
    );
  }

  async getBillingKey(body: BillingKeyProps) {
    const { authKey, customerKey } = body;
    const user = await this.authService.currentApiUser();

    if (!user) {
      throw new ConflictException('유저정보가 조회되지 않습니다');
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

  async deleteBillingKey() {
    const user = await this.authService.currentApiUser();
    if (!user) {
      throw new ConflictException('유저정보가 조회되지 않습니다');
    }
    return this.usersRepository.deleteBillingKey(user);
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

  async me(email: string): Promise<UsersEntity> {
    const user = await this.usersRepository.me(email);
    return user;
  }

  async findByUuid(uuid: string): Promise<UsersEntity> {
    const user = this.usersRepository.findByUuid(uuid);
    return user;
  }

  async getOneDriver(param: number): Promise<UsersEntity> {
    const user = this.usersRepository.getOneUserById(param);
    return user;
  }

  async getDrivers(
    driverSearchDto: DriverSearchDto,
    page: number,
    sortBy: string,
    searchBy: string,
  ) {
    const { departureDate, departureTime, schedule } = driverSearchDto;
    const departureHour = departureTime.split(' ')[0];
    const departMonth = await this.getMonth(departureDate);
    const isDepartPeak = await this.monthsService.isPeakMonth(departMonth);
    const drivers = await this.usersRepository.findTargetDrivers(
      schedule,
      page,
      sortBy,
      searchBy,
    );

    const distance = schedule.reduce(
      (prev, curr) => prev + (curr as any).distance,
      0,
    );

    if (drivers) {
      drivers.forEach(async (driver) => {
        const restDistance =
          distance - driver.basic_km > 0 ? distance - driver.basic_km : 0;

        const baseCharge = isDepartPeak
          ? driver.peak_charge || driver.basic_charge
          : driver.basic_charge;

        const baseChargePerKm = isDepartPeak
          ? driver.peak_charge_per_km || driver.charge_per_km
          : driver.charge_per_km;

        let totalCharge =
          restDistance * baseChargePerKm + baseCharge + driver.service_charge;

        // 야간할증 계산
        if (
          Number(departureHour) >= driver.night_begin ||
          Number(departureHour) <= driver.night_end
        ) {
          totalCharge += driver.night_charge;
        }

        (driver as any).totalCharge = totalCharge;
      });
    }

    return {
      data: drivers,
    };
  }

  async driversByRegion(x: string, y: string) {
    const {
      data: {
        addressInfo: { city_do: region },
      },
    } = await this.scheduleService.getReverseGeoData(x, y);

    const drivers = await this.usersRepository.findDriversByRegion(region);
    return {
      data: drivers,
    };
  }

  async getMonth(date: string) {
    const month = moment(date)
      .format('YYYY년 M월 DD일 HH시 MM분')
      .split(' ')[1];
    return month;
  }
}
