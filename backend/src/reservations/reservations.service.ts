import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReservationsRepository } from './reservations.repository';
import { UsersService } from '@users/users.service';

@Injectable()
export class ReservationsService {
  constructor(
    @InjectRepository(ReservationsRepository)
    private reservationsRepository: ReservationsRepository,
    private readonly usersService: UsersService,
  ) {}

  async create(reservationCreateDto) {
    const { userEmail } = reservationCreateDto.reservation;
    const me = await this.usersService.me(userEmail);
    const userId = me.id;
    return await this.reservationsRepository.createReservation(
      reservationCreateDto,
      userId,
    );
  }

  async getAllFromUser(email) {
    const me = await this.usersService.me(email);
    const myId = me.id;
    return await this.reservationsRepository.getAllFromUser(myId);
  }

  async updateReservation(param) {
    return await this.reservationsRepository.updateReservation(param);
  }
}
