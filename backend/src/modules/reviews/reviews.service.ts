import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReservationsRepository } from '@reservations/reservations.repository';
import { ReservationsService } from '@reservations/reservations.service';
import { ReviewCreateDto } from './dto/create-review-dto';
import { ReviewUpdateDto } from './dto/update-review.dto';
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
      await this.reservationsRepository.update({id: reservationId}, {review: data})
    } catch (error) {
      console.log(error)
      throw new ConflictException("예상치 못한 오류가 발생하였습니다")
    } finally {
      return data;
    }
  }

  async getAllReviews() {
    const allReviews = await this.reviewsRepository.find({
      order: {
        createdAt: 'DESC'
      }
    });

    return allReviews
  }

  async getReviewsOfDriver(driverId?: number) {
    let reviews;
    if(driverId) {
      reviews = await this.reviewsRepository.getReviews(driverId)
    } else {
      reviews = await this.reviewsRepository.find({
        order: {
          createdAt: 'DESC'
        }
      });
    }
    return reviews;
  }

  async getReviewsOfReservation(reservationId: number) {
    const {review: data } = await this.reservationsRepository.findOne({
      relations: ['review'],
      where: {
        id: reservationId
      }
    })
    
    if(!data) throw new ConflictException("리뷰가 존재하지 않습니다")

    return data;
  }

  async update(reviewUpdateDto: ReviewUpdateDto, reservationId: number) {
    const {rating, content} = reviewUpdateDto;
    try {
      const targetReservation = await this.reservationsRepository.findOne(reservationId)
      await this.reviewsRepository.update({ reservation: targetReservation }, { rating: rating, content: content });
    } catch (error) {
      console.log(error)
      throw new ConflictException("예상치 못한 오류가 발생하였습니다")
    } finally {
      return { message: "리뷰가 수정되었습니다" };
    }
  }

  async delete(reviewId: number) {
    return this.reviewsRepository.deleteReview(reviewId);
  }
}
