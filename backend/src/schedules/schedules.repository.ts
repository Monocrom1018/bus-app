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
  async createSchedule(scheduleCreateDto: any, userId: any): Promise<Schedule> {
    const { driverId, departure, returnDate, departureDate, destination } =
      scheduleCreateDto;

    const existingCheck = await Schedule.findOne({
      where: {
        user: userId,
        driver: driverId,
        status: '수락대기중',
      },
    });

    if (existingCheck) {
      throw new ConflictException('reservation already exists');
    }

    const schedule = new Schedule();
    // schedule.departureDate = departureDate;
    // schedule.returnDate = returnDate;
    // schedule.departure = departure;
    // schedule.destination = destination;
    await Schedule.save(schedule);

    return schedule;
  }
}
