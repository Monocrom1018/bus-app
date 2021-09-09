import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReservationsRepository } from '@reservations/reservations.repository';
import { ReservationsService } from '@reservations/reservations.service';
import { ReviewCreateDto } from './dto/create-review-dto';
import { ReviewsRepository } from './reviews.repository';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(ReviewsRepository)
    private readonly reviewsRepository: ReviewsRepository,
    private readonly reservationsRepository: ReservationsRepository,

    private readonly reservationsService: ReservationsService,
  ) {}

  async create(reviewCreateDto: ReviewCreateDto) {
    const { reservationId } = reviewCreateDto
    const targetReservation = await this.reservationsService.getListById(reservationId)

    if(!targetReservation) throw new ConflictException("예약이 존재하지 않습니다")

    const { user, driver } = targetReservation[0]
    const data = await this.reviewsRepository.createReview(
      reviewCreateDto,
      user,
      driver,
    );

    try {
      // await this.reservationsRepository.update({id: reservationId}, {review: data})
      const target = await this.reservationsRepository.findOne(reservationId);
      target.review = data;
      await this.reservationsRepository.save(target);
    } catch (error) {
      console.log(error)
      throw new ConflictException("예상치 못한 오류가 발생하였습니다")
    }

    return data;
  }

  async get(id: number) {
    const reviews = this.reviewsRepository.getReviews(id)
    return reviews;
  }

  async delete(reviewId: number) {
    return this.reviewsRepository.deleteReview(reviewId);
  }
}
