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
  async createSchedule(scheduleCreateDto: any): Promise<SchedulesEntity> {
    const { departure, returnDate, departureDate, destination, stopover } =
      scheduleCreateDto;

    const schedule = new SchedulesEntity();
    // schedule.departureDate = departureDate;
    // schedule.returnDate = returnDate;
    // schedule.departure = departure;
    // schedule.destination = destination;
    await SchedulesEntity.save(schedule);

    return schedule;
  }
}
