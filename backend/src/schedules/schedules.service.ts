import {
  Injectable,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import qs from 'qs';
import { SchedulesRepository } from './schedules.repository';

@Injectable()
export class SchedulesService {
  constructor(
    @InjectRepository(SchedulesRepository)
    private schedulesRepository: SchedulesRepository,
  ) {}

  async create(scheduleCreateDto) {
    const data = await this.schedulesRepository.createSchedule(
      scheduleCreateDto,
    );
    return data;
  }

  async getDistance(params) {
    const { departure, destination, stopOvers } = params;

    if (departure === '' || destination === '') {
      throw new BadRequestException();
    }

    let combinedGeoData = '';

    const combinedStopOvers = stopOvers[0].region;

    for (let i = 0; i < combinedStopOvers.length; i++) {
      if (combinedStopOvers[i] === '') {
        console.log('ConflictException');
        throw new ConflictException();
      }

      // promise all로 변경할수 있을듯
      // eslint-disable-next-line no-await-in-loop
      const geoData = await this.getGeoData(combinedStopOvers[i]);
      const tmapsGeo = `${
        geoData.data.coordinateInfo.coordinate[0].lon ||
        geoData.data.coordinateInfo.coordinate[0].newLon
      },${
        geoData.data.coordinateInfo.coordinate[0].lat ||
        geoData.data.coordinateInfo.coordinate[0].newLat
      }_`;
      combinedGeoData += tmapsGeo;
    }

    combinedGeoData = combinedGeoData.slice(0, -1);

    // 출발지, 하차지 좌표정보 수집
    const departureCoord = { x: '', y: '' };
    const landingCoord = { x: '', y: '' };

    const departureData = await this.getGeoData(departure);
    const landingData = await this.getGeoData(destination);

    departureCoord.x =
      departureData.data.coordinateInfo.coordinate[0].lon ||
      departureData.data.coordinateInfo.coordinate[0].newLon;
    departureCoord.y =
      departureData.data.coordinateInfo.coordinate[0].lat ||
      departureData.data.coordinateInfo.coordinate[0].newLat;

    landingCoord.x =
      landingData.data.coordinateInfo.coordinate[0].lon ||
      landingData.data.coordinateInfo.coordinate[0].newLon;
    landingCoord.y =
      landingData.data.coordinateInfo.coordinate[0].lat ||
      landingData.data.coordinateInfo.coordinate[0].newLat;

    // 거리정보 요청
    const tmapBody = await qs.stringify({
      endX: departureCoord.x,
      endY: departureCoord.y,
      startX: landingCoord.x,
      startY: landingCoord.y,
      passList: combinedGeoData,
      searchOption: 10,
      totalValue: 2,
      trafficInfo: 'N',
    });

    const tmapConfig = {
      appKey: process.env.TMAP_API_KEY,
      'Accept-Language': 'ko',
      'Content-Type': 'application/x-www-form-urlencoded',
    };

    const tmapApi = await axios.post(
      'https://apis.openapi.sk.com/tmap/routes?version=1',
      tmapBody,
      { headers: tmapConfig },
    );

    const kmData = Math.round(
      tmapApi.data.features[0].properties.totalDistance / 1000,
    );

    console.log('kmData', kmData);

    return kmData;
  }

  async getGeoData(param: any) {
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
