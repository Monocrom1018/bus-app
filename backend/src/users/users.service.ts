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

import axios from 'axios';

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

  async me() {
    const users = this.usersRepository.me();
    return users;
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
    let geoData = '';

    if (stopovers.length > 0) {
      await Promise.all(
        stopovers.map(async (stopover) => {
          if (stopover.stopover === '') {
            return false;
          }

          const stopoverData = await axios.get(
            `https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode`,
            {
              headers: {
                'X-NCP-APIGW-API-KEY-ID': process.env.X_NCP_APIGW_API_KEY_ID,
                'X-NCP-APIGW-API-KEY': process.env.X_NCP_APIGW_API_KEY,
              },
              params: {
                query: stopover.stopover,
              },
            },
          );

          const data = `${stopoverData.data.addresses[0].x},${stopoverData.data.addresses[0].y}|`;
          geoData = geoData + data;
        }),
      );

      geoData = geoData.slice(0, -1);
    }

    const departureData = await axios.get(
      `https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode`,
      {
        headers: {
          'X-NCP-APIGW-API-KEY-ID': process.env.X_NCP_APIGW_API_KEY_ID,
          'X-NCP-APIGW-API-KEY': process.env.X_NCP_APIGW_API_KEY,
        },
        params: {
          query: departure,
        },
      },
    );

    const destinationData = await axios.get(
      `https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode`,
      {
        headers: {
          'X-NCP-APIGW-API-KEY-ID': process.env.X_NCP_APIGW_API_KEY_ID,
          'X-NCP-APIGW-API-KEY': process.env.X_NCP_APIGW_API_KEY,
        },
        params: {
          query: destination,
        },
      },
    );

    depCoord.x = departureData.data.addresses[0].x;
    depCoord.y = departureData.data.addresses[0].y;

    destCoord.x = destinationData.data.addresses[0].x;
    destCoord.y = destinationData.data.addresses[0].y;

    const distanceURL = `https://naveropenapi.apigw.ntruss.com/map-direction/v1/driving?start=${depCoord.x},${depCoord.y}&goal=${destCoord.x},${destCoord.y}&waypoints=${geoData}`;

    const distanceData = await axios.get(distanceURL, {
      headers: {
        'X-NCP-APIGW-API-KEY-ID': process.env.X_NCP_APIGW_API_KEY_ID,
        'X-NCP-APIGW-API-KEY': process.env.X_NCP_APIGW_API_KEY,
      },
    });

    // console.log(
    //   'distanceData : ',
    //   distanceData.data.route.traoptimal[0].summary,
    // );

    const kmData = Math.round(
      distanceData.data.route.traoptimal[0].summary.distance / 1000,
    );

    return kmData;
  }
}
