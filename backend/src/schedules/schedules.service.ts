import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from '@users/users.service';
import { SchedulesRepository } from './schedules.repository';
import axios from 'axios';
import qs from 'qs';

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
    const { departure, destination, landing } = params;
    let combinedGeoData = '';

    const combineStopovers = [];
    combineStopovers.push(destination);
    for (let i = 0; i < combineStopovers.length; i++) {
      if (combineStopovers[i] === '') {
        return;
      }
      // eslint-disable-next-line no-await-in-loop
      const geoData = await this.getGeoData(combineStopovers[i]);
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
    const landingData = await this.getGeoData(landing);

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
      appKey: process.env.TMAP_API_KEY,
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
