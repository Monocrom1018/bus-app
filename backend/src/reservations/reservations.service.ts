import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReservationsRepository } from './reservations.repository';
import { Reservations as Reservation } from './reservations.entity';
import { UsersService } from '@users/users.service';

@Injectable()
export class ReservationsService {
  constructor(
    @InjectRepository(ReservationsRepository)
    private reservationsRepository: ReservationsRepository,
    private readonly usersService: UsersService,
  ) {}

  async create(params) {
    const me = await this.usersService.me(params.user);
    params['user'] = me.id;

    return await this.reservationsRepository.createReservation(params);
  }

  async getAllFromUser(email) {
    const me = await this.usersService.me(email);
    return await this.reservationsRepository.getAllFromUser(me);
  }
}
