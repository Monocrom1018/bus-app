import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BusesController } from './buses.controller';
import { BusesRepository } from './buses.repository';
import { BusesService } from './buses.service';

@Module({
  imports: [TypeOrmModule.forFeature([BusesRepository])],
  controllers: [BusesController],
  providers: [BusesService],
  exports: [BusesService],
})
export class BusesModule {}
