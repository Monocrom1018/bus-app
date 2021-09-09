import { ConflictException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { ReviewsEntity } from './reviews.entity';

@EntityRepository(ReviewsEntity)
export class ReviewsRepository extends Repository<ReviewsEntity> {
  
  async createReview(reviewCreateDto, user, driver) {
    const { content, rating, reservationId } = reviewCreateDto;
    const review = new ReviewsEntity()
    try {
    review.user = user;
    review.driver = driver;
    review.reservation = reservationId;
    review.content = content;
    review.rating = rating;
    ReviewsEntity.save(review);
    } catch (error) {
      console.log(error);
      throw new ConflictException(
        '리뷰가 작성되지 않았습니다. 다시 시도해주세요',
      );
    }

    return review;
  }
  
  async getReviews(id) {
    const reviews = await this.find({
      driver: id
    })

    return reviews;
  }


  async deleteReview(reviewId) {
    const targetReview = await this.findOne({
      id: reviewId
    })
    if(!targetReview) throw new ConflictException("해당 리뷰가 존재하지 않습니다");

    ReviewsEntity.delete(targetReview)

    return { message: '리뷰가 삭제되었습니다' };
  }
}
