import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { UsersEntity } from '@users/users.entity';
import { EntityRepository, Repository } from 'typeorm';
import { ScheduleCreateDto } from './dto/create-schedule.dto';
import { SchedulesEntity } from './schedules.entity';

@EntityRepository(SchedulesEntity)
export class SchedulesRepository extends Repository<SchedulesEntity> {
  async createSchedule(scheduleCreateDto: any, reservation) {
    const { tourSchedule } = scheduleCreateDto;

    for (let singleSchedule of tourSchedule) {
      const schedule = new SchedulesEntity();
      const { day, departure, destination, distance, stopOvers } =
        singleSchedule;
      schedule.day = day;
      schedule.departure = departure;
      schedule.destination = destination;
      schedule.distance = distance;
      schedule.reservation = reservation[0];
      schedule.stopover = stopOvers[0] ? [stopOvers[0].region] : [];
      stopOvers[1] ? schedule.stopover.push(stopOvers[1].region) : null;
      SchedulesEntity.save(schedule);
    }

    return { message: 'schedule create success' };
  }
}
