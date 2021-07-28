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

  async getDistance(departure, stopovers, destination, lastDestination) {
    // 출발지 - 목적지 거리
    let distance = await this.getDistanceAPI({
      departure,
      destination,
      stopovers,
    });

    // 목적지 - 하차지 거리
    const subDistance = await this.getDistanceAPI({
      departure: destination,
      destination: lastDestination || departure,
      stopovers: [],
    });

    distance = distance + subDistance;

    return distance;
  }

  async getDistanceAPI(params) {
    const { departure, destination, stopovers } = params;
    const depCoord = { x: '', y: '' };
    const destCoord = { x: '', y: '' };
    let tmapData = '';

    if (stopovers.length > 0 && stopovers[0].stopover !== '') {
      for (let i = 0; i < stopovers.length; i++) {
        if (stopovers[i] === '') {
          return;
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

    depCoord.x =
      departureData.data.coordinateInfo.coordinate[0].lon ||
      departureData.data.coordinateInfo.coordinate[0].newLon;
    depCoord.y =
      departureData.data.coordinateInfo.coordinate[0].lat ||
      departureData.data.coordinateInfo.coordinate[0].newLat;

    destCoord.x =
      destinationData.data.coordinateInfo.coordinate[0].lon ||
      destinationData.data.coordinateInfo.coordinate[0].newLon;
    destCoord.y =
      destinationData.data.coordinateInfo.coordinate[0].lat ||
      destinationData.data.coordinateInfo.coordinate[0].newLat;

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
