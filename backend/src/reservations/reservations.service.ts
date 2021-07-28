import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from '@users/users.service';
import { ReservationsRepository } from './reservations.repository';

@Injectable()
export class ReservationsService {
  constructor(
    @InjectRepository(ReservationsRepository)
    private reservationsRepository: ReservationsRepository,
    private readonly usersService: UsersService,
  ) {}

  async create(reservationCreateDto) {
    const { userEmail } = reservationCreateDto;
    const { id: userId } = await this.usersService.me(userEmail);
    const data = await this.reservationsRepository.createReservation(
      reservationCreateDto,
      userId,
    );
    return data;
  }

  async getListById(id: number) {
    const data = await this.reservationsRepository.getListById(id);
    return data;
  }

  async getListByEmail(email, page) {
    const me = await this.usersService.me(email);
    const myId = me.id;
    const data = await this.reservationsRepository.getListByEmail(myId, page);
    return data;
  }

  async updateReservation(param) {
    const data = await this.reservationsRepository.updateReservation(param);
    return data;
  }
}
