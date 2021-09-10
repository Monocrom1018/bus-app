import Faker from 'faker';
import { define } from 'typeorm-seeding';
import { ReviewsEntity } from '@reviews/reviews.entity';


define(ReviewsEntity, (faker: typeof Faker) => {
  const review = new ReviewsEntity();
  review.rating = faker.random.number({min:1, max:5});
  review.content = faker.lorem.sentences(1);
  return review;
});