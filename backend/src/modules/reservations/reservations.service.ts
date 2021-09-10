import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/modules/users/users.service';
import { ReservationCreateDto } from './dto/create-reservation.dto';
import { ReservationsRepository } from './reservations.repository';

@Injectable()
export class ReservationsService {
  constructor(
    @InjectRepository(ReservationsRepository)
    private reservationsRepository: ReservationsRepository,

    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
  ) {}

  async create(reservationCreateDto: ReservationCreateDto) {
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

  async getListByEmail(email, status, page) {
    let data;

    if(email) {
      const { id: myId } = await this.usersService.me(email);
      data = await this.reservationsRepository.getListByEmail(myId, status, page);
    } else {
      data = await this.reservationsRepository.find({
        order: {
          createdAt: 'DESC'
        }
      })
    }

    return data;
  }

  async updateReservation(reservationUpdateDto, reservationId) {
    const data = await this.reservationsRepository.updateReservation(reservationUpdateDto, reservationId);
    return data;
  }
}
