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

    return { foundDrivers: drivers, foundDistance: distance };
  }

  async getDistance(params) {
    const { departure, destination } = params;
    const depCoord = { x: '', y: '' };
    const destCoord = { x: '', y: '' };

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

    //! 아래는 이용 시 요금 부과되는 서비스라 주석처리 해뒀습니다. 주석해제 시 km거리 산출됩니다.
    // const distanceData = await axios.get(
    //   `https://naveropenapi.apigw.ntruss.com/map-direction/v1/driving?start=${depCoord.x},${depCoord.y}&goal=${destCoord.x},${destCoord.y}`,
    //   {
    //     headers: {
    //       'X-NCP-APIGW-API-KEY-ID': process.env.X_NCP_APIGW_API_KEY_ID,
    //       'X-NCP-APIGW-API-KEY': process.env.X_NCP_APIGW_API_KEY,
    //     },
    //   },
    // );

    // const kmData = (
    //   distanceData.data.route.traoptimal[0].summary.distance / 1000
    // ).toFixed(1);

    return 81.9;
  }
}
