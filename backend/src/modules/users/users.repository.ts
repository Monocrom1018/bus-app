import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Brackets, EntityRepository, getRepository, Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { ImagesEntity } from '@images/images.entity';
import { UserCreateDto } from './dto/user-create.dto';
import { UsersEntity } from './users.entity';
import { UserType } from './enum';
import { BusesEntity } from '@buses/buses.entity';

@EntityRepository(UsersEntity)
export class UsersRepository extends Repository<UsersEntity> {
  async signUp(
    userCreateDto: UserCreateDto,
    uuid: string,
  ): Promise<UsersEntity> {
    const {
      email,
      password,
      name,
      user_type,
      company,
      director_name,
      director_email,
      director_phone,
      termCheck,
      privacyCheck,
      marketingCheck,
    } = userCreateDto;

    const user = new UsersEntity();
    user.email = email;
    user.name = name;
    user.user_type = UserType[user_type] || undefined;
    user.encrypted_password = await bcrypt.hash(`${password}`, 10);
    user.uuid = uuid;
    user.term_check = termCheck;
    user.privacy_check = privacyCheck;
    user.marketing_check = marketingCheck;

    if (user_type === 'DRIVER') {
      user.director_name = director_name || null;
      user.company_name = company || null;
      user.director_email = director_email || null;
      user.director_phone = director_phone || null;
      user.registration_confirmed = false;
    } else if (user_type === 'NORMAL') {
      user.registration_confirmed = true;
    }

    try {
      await user.save();
    } catch (error) {
      // duplicate email
      if (error.code === '23505') {
        throw new ConflictException('email alerady exists');
      } else {
        throw new InternalServerErrorException();
      }
    }

    return user;
  }

  async validateUserPassword(
    userCreateDto: UserCreateDto,
  ): Promise<UsersEntity> {
    const { email, password } = (userCreateDto as any).user;

    const user = await this.findOne({ email });
    if (user && (await user.validateUserPassword(password))) {
      return user;
    }
    return null;
  }

  async findAll(): Promise<UsersEntity[]> {
    const users = await this.find({
      order: {
        createdAt: 'ASC',
      },
    });
    return users;
  }

  async me(email: string): Promise<UsersEntity> {
    const user = await this.findOne({
      relations: ['profile', 'bus'],
      where: {
        email,
      },
    });
    return user;
  }

  async findByUuid(uuid: string): Promise<UsersEntity> {
    console.log(uuid);
    const user = await this.findOne({
      where: {
        uuid,
      },
    });
    return user;
  }

  async saveBillingKey(
    billingResult: { [key: string]: string },
    currentApiUser: UsersEntity,
  ) {
    const { billingKey, cardCompany, cardNumber } = billingResult;
    const user = currentApiUser;

    try {
      user.card_registered = true;
      user.card_company = cardCompany;
      user.card_number = cardNumber;
      user.card_billing_key = billingKey;
      user.save();
    } catch (err) {
      throw new ConflictException(err);
    }

    return user;
  }

  async deleteBillingKey(
    currentApiUser: UsersEntity,
  ) {
    const user = currentApiUser

    try {
    user.card_registered = false;
    user.card_number = null;
    user.card_company = null;
    user.card_billing_key = null;
    user.save();
    } catch (err) {
      throw new ConflictException(err)
    }
    
    return user;
  }

  async updateUser(
    currentApiUser: UsersEntity,
    userUpdateDto,
    profile: ImagesEntity,
    bus: BusesEntity,
  ) {
    const {
      drivableRegion,
      company,
      busNumber,
      busType,
      busOld,
      peopleAvailable,
      introduce,
      basicCharge,
      basicKm,
      nightCharge,
      chargePerKm,
      nightBegin,
      nightEnd,
      chargePerDay,
      serviceCharge,
      peakCharge,
      peakChargePerKm,
      sanitizer,
      wifi,
      fridge,
      usb,
      movie,
      audio,
      bank,
      bank_account,
      password,
    } = userUpdateDto;

    const user = currentApiUser;

    if (!user) {
      throw new ConflictException('유저정보가 조회되지 않습니다');
    }

    if(password) {
      user.encrypted_password = await bcrypt.hash(`${password}`, 10);
    }

    if (profile) {
      user.profile = profile;
    }

    if(user.user_type === 'driver') {
      user.bus = bus
      user.bus.bus_number = busNumber;
      user.bus.bus_type = busType;
      user.bus.bus_old = busOld;
      user.bus.people_available = peopleAvailable;
      user.bus.sanitizer = sanitizer === 'true';
      user.bus.wifi = wifi === 'true';
      user.bus.fridge = fridge === 'true';
      user.bus.usb = usb === 'true';
      user.bus.movie = movie === 'true';
      user.bus.audio = audio === 'true';
      user.bus.save();
    }

    try {
      user.basic_charge = basicCharge;
      user.basic_km = basicKm;
      user.charge_per_km = chargePerKm;
      user.company_name = company;
      user.drivable_region = drivableRegion;
      user.night_begin = nightBegin;
      user.night_end = nightEnd;
      user.night_charge = nightCharge;
      user.service_charge = serviceCharge;
      user.charge_per_day = chargePerDay;
      user.introduce = introduce;
      user.peak_charge = peakCharge;
      user.peak_charge_per_km = peakChargePerKm;
      user.bank = bank;
      user.bank_account = bank_account;
      user.save();
    } catch (err) {
      throw new ConflictException(err);
    }

    return user;
  }

  async getOneUserById(param: number): Promise<UsersEntity> {
    const user = await this.findOne({
      relations: ['profile', 'bus'],
      where: {
        id: param,
      },
    });
    return user;
  }

  async findTargetDrivers(
    schedule: Array<{ [key: string]: string | number }>,
    page: number,
    sortBy: string,
    searchBy: string,
  ): Promise<UsersEntity[]> {
    const { departure } = schedule[0];
    const region = (departure as string).split(' ')[0];
    let orderQuery = {};

    switch (sortBy) {
      case 'createdAtDesc':
        orderQuery = { 'users.createdAt': 'DESC' };
        break;
      case 'chargeAsc':
        orderQuery = {
          'users.basic_charge': 'ASC',
          'users.charge_per_km': 'ASC',
        };
        break;
      case 'peopleAsc':
        orderQuery = { 'buses.people_available': 'ASC' };
        break;
      case 'peopleDesc':
        orderQuery = { 'buses.people_available': 'DESC' };
        break;
      default:
        orderQuery = { 'users.createdAt': 'DESC' };
    }

    const drivers = await getRepository(UsersEntity)
      .createQueryBuilder('users')
      .where(`drivable_region @> ARRAY['${region}']`)
      .andWhere(
        new Brackets((qb) => {
          qb.where('user_type = :driver', { driver: 'driver' });
        }),
        )
      .andWhere("users.name ilike :name", { name:`%${searchBy}%` })
      .innerJoinAndSelect('users.bus', 'buses')
      .orderBy(orderQuery)
      .take(5)
      .skip(5 * (page - 1))
      .getMany();

    return drivers;
  }

  async findDriversByRegion(region: string) {
    const drivers = await getRepository(UsersEntity)
      .createQueryBuilder('users')
      .where(`drivable_region @> ARRAY['${region.slice(0,2)}']`)
      .innerJoinAndSelect('users.bus', 'buses')
      .orderBy('RANDOM()')
      .getMany()

    const selectFive = drivers.splice(0,5);
    return selectFive;
  }
}
