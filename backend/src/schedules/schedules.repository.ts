import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Users as User } from '@users/users.entity';
import { EntityRepository, Repository } from 'typeorm';
import { ScheduleCreateDto } from './dto/create-schedule.dto';
import { Schedules as Schedule } from './schedules.entity';

@EntityRepository(Schedule)
export class SchedulesRepository extends Repository<Schedule> {
  async createSchedule(scheduleCreateDto: any, reservation) {
    const { tourSchedule } = scheduleCreateDto;

    for (let singleSchedule of tourSchedule) {
      const schedule = new Schedule();
      const { day, departure, destination, distance, stopOvers } =
        singleSchedule;
      schedule.day = day;
      schedule.departure = departure;
      schedule.destination = destination;
      schedule.distance = distance;
      schedule.reservation = reservation[0];
      schedule.stopover = stopOvers[0] ? [stopOvers[0].region] : [];
      stopOvers[1] ? schedule.stopover.push(stopOvers[1].region) : null;
      Schedule.save(schedule);
    }

    return { message: 'schedule create success' };
  }
}
