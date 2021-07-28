import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from '@users/users.service';
import { SchedulesRepository } from './schedules.repository';

@Injectable()
export class SchedulesService {
  constructor(
    @InjectRepository(SchedulesRepository)
    private schedulesRepository: SchedulesRepository,
    private readonly usersService: UsersService,
  ) {}

  async create(scheduleCreateDto) {
    const { userEmail } = scheduleCreateDto;
    const { id: userId } = await this.usersService.me(userEmail);
    const data = await this.schedulesRepository.createSchedule(
      scheduleCreateDto,
      userId,
    );
    return data;
  }

  async getDistance(departure, stopovers, destination) {
    const distance = await this.usersService.getDistance({
      departure,
      stopovers,
      destination,
    });
    return distance;
  }
}
