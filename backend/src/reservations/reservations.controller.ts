import { Body, Controller, Post } from '@nestjs/common';
import { ReservationsService } from './reservations.service';

const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  // 이하는 출발지, 도착지 받아와서 양 지점간 거리 계산 후 km단위로 리턴해주는 함수

  @Post('/distance')
  async getDistance(@Body() params) {
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

    const distanceData = await axios.get(
      `https://naveropenapi.apigw.ntruss.com/map-direction/v1/driving?start=${depCoord.x},${depCoord.y}&goal=${destCoord.x},${destCoord.y}`,
      {
        headers: {
          'X-NCP-APIGW-API-KEY-ID': process.env.X_NCP_APIGW_API_KEY_ID,
          'X-NCP-APIGW-API-KEY': process.env.X_NCP_APIGW_API_KEY,
        },
      },
    );

    const kmData = (
      distanceData.data.route.traoptimal[0].summary.distance / 1000
    ).toFixed(1);

    console.log(kmData + 'km');

    return kmData;
  }
}
