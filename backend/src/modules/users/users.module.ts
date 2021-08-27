import { TypeOrmModule } from '@nestjs/typeorm';
import { forwardRef, Module } from '@nestjs/common';
import { MonthsModule } from 'src/modules/months/months.module';
import { SchedulesModule } from 'src/modules/schedules/schedules.module';
import { ImagesRepository } from '@images/images.repository';
import { UsersRepository } from './users.repository';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { BusesRepository } from '@buses/buses.repository';
import { FilesRepository } from '@files/files.repository';
import { FilesModule } from '@files/files.module';

@Module({
  imports: [
    MonthsModule,
    FilesModule,
    forwardRef(() => SchedulesModule),
    TypeOrmModule.forFeature([UsersRepository, ImagesRepository, BusesRepository, FilesRepository]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
