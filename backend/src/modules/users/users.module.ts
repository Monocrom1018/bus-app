import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { MonthsModule } from 'src/modules/months/months.module';
import { SchedulesModule } from 'src/modules/schedules/schedules.module';
import { ImagesRepository } from '@images/images.repository';
import { UsersRepository } from './users.repository';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
  imports: [
    MonthsModule,
    TypeOrmModule.forFeature([UsersRepository, ImagesRepository]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
