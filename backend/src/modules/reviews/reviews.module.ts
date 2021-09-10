import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewsController } from './reviews.controller';
import { ReviewsService } from './reviews.service';
import { ReviewsRepository } from './reviews.repository';
import { ReservationsModule } from '@reservations/reservations.module';
import { ReservationsRepository } from '@reservations/reservations.repository';

@Module({
  imports: [
    ReservationsModule,
    TypeOrmModule.forFeature([ReviewsRepository, ReservationsRepository]),
  ],
  controllers: [ReviewsController],
  providers: [ReviewsService],
})
export class ReviewsModule {}
