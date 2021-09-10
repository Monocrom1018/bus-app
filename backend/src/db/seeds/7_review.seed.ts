import { Connection, getRepository } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import { ReviewsEntity } from '@reviews/reviews.entity';
import { UsersEntity } from '@users/users.entity';

export default class CreateReviews implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await factory(ReviewsEntity)()
      .map(async (review) => {
          const normal = await getRepository(UsersEntity)
            .createQueryBuilder('user')
            .where('user.user_type = :user_type', { user_type: 'normal' })
            .orderBy("RANDOM()")
            .limit(1)
            .getOne();

          const driver = await getRepository(UsersEntity)
            .createQueryBuilder('user')
            .where('user.user_type = :user_type', { user_type: 'driver' })
            .orderBy("RANDOM()")
            .limit(1)
            .getOne();
        
        review.driver = driver;
        review.user = normal;

        return review;
      })
      .createMany(500);
  }
}