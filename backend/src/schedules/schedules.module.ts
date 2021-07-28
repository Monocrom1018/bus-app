import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '@users/users.module';
import { SchedulesController } from './schedules.controller';
import { SchedulesService } from './schedules.service';
import { SchedulesRepository } from './schedules.repository';

@Module({
  imports: [UsersModule, TypeOrmModule.forFeature([SchedulesRepository])],
  controllers: [SchedulesController],
  providers: [SchedulesService],
})
export class SchedulesModule {}
