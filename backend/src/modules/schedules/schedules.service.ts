import {
  Injectable,
  ConflictException,
  BadRequestException,
  forwardRef,
  Inject,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import qs from 'qs';
import { ReservationsService } from '@reservations/reservations.service';
import { SchedulesRepository } from './schedules.repository';

@Injectable()
export class SchedulesService {
  constructor(
    @InjectRepository(SchedulesRepository)
    private schedulesRepository: SchedulesRepository,

    @Inject(forwardRef(() => ReservationsService))
    private reservationsService: ReservationsService,
  ) {}

  async create(scheduleCreateDto) {
    const { reservationId } = scheduleCreateDto;
    const reservation = await this.reservationsService.getListById(
      reservationId,
    );

    const data = await this.schedulesRepository.createSchedule(
      scheduleCreateDto,
      reservation,
    );
    return data;
  }

  async getDistance(params) {
    const { departure, destination, stopOvers } = params;

    let combinedGeoData = '';
    let combinedStopOvers = [];

    if (stopOvers && typeof stopOvers[0]?.region === 'object') {
      combinedStopOvers = stopOvers[0].region;
    } else if (stopOvers && typeof stopOvers[0]?.region === 'string') {
      combinedStopOvers = [stopOvers[0].region];
    }

    for (let i = 0; i < combinedStopOvers.length; i++) {
      if (combinedStopOvers[i] === '') {
        throw new BadRequestException('empty data exist');
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

    try {
      const tmapApi = await axios.post(
        'https://apis.openapi.sk.com/tmap/routes?version=1',
        tmapBody,
        {
          headers: tmapConfig,
        },
      );

      const kmData = Math.round(
        tmapApi.data.features[0].properties.totalDistance / 1000,
      );

      console.log(kmData);

      return kmData;
    } catch (err) {
      throw new BadRequestException('over 1000km');
    }
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

  async getReverseGeoData(x: string, y: string) {
    const data = await axios.get(
      'https://apis.openapi.sk.com/tmap/geo/reversegeocoding',
      {
        params: {
          version: 1,
          lon: x,
          lat: y,
          appKey: process.env.TMAP_API_KEY,
        },
      },
    );

    return data;
  }
}
