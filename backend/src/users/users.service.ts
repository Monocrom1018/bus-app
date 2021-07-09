import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from '@auth/auth.service';
import { UserCreateDto } from './dto/user-create.dto';
import { UserSearchDto } from './dto/user-search.dto';
import { UserUpdateDto } from './dto/user-update.dto';
import { UsersRepository } from './users.repository';
import { Users as User } from './users.entity';

const axios = require('axios');
const qs = require('qs');

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
    private authService: AuthService,
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

  async update(filename: string, userUpdateDto) {
    const user = await this.authService.currentApiUser();
    return this.usersRepository.updateUser(user, filename, userUpdateDto);
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
          totalCharge += driver.night_charge;
        }
        (driver as any).totalCharge = totalCharge;
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
        const tmapsGeo = `${stopoverData.data.coordinateInfo.coordinate[0].newLon},${stopoverData.data.coordinateInfo.coordinate[0].newLat}_`;
        tmapData += tmapsGeo;
      }

      tmapData = tmapData.slice(0, -1);
    }

    const departureData = await this.getGeoData(departure);
    const destinationData = await this.getGeoData(destination);

    console.log(departureData);

    depCoord.x = departureData.data.coordinateInfo.coordinate[0].newLon;
    depCoord.y = departureData.data.coordinateInfo.coordinate[0].newLat;

    destCoord.x = destinationData.data.coordinateInfo.coordinate[0].newLon;
    destCoord.y = destinationData.data.coordinateInfo.coordinate[0].newLat;

    const tmapBody = await qs.stringify({
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
    return await axios.get(`https://apis.openapi.sk.com/tmap/geo/fullAddrGeo`, {
      params: {
        addressFlag: 'F00',
        version: '1',
        fullAddr: param,
        appKey: process.env.TMAP_API_KEY,
      },
    });
  }
}
