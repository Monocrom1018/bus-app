import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BusesRepository } from './buses.repository';

@Injectable()
export class BusesService {
  constructor(
    @InjectRepository(BusesRepository)
    private busesRepository: BusesRepository,
  ) {}
  
}
