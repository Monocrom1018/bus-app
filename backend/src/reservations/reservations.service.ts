import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReservationsRepository } from './reservations.repository';
import { Reservations as Reservation } from './reservations.entity';

const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

@Injectable()
export class ReservationsService {
  constructor(
    @InjectRepository(ReservationsRepository)
    private reservationsRepository: ReservationsRepository,
  ) {}

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

    return '37.5';
  }
}
