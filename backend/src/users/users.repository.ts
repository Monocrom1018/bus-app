import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Brackets, EntityRepository, Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { UserCreateDto } from './dto/user-create.dto';
import { Users as User, UserType } from './users.entity';
import { DriverSearchDto } from './dto/driver-search.dto';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  async signUp(userCreateDto: UserCreateDto, uuid: string): Promise<User> {
    const {
      email,
      password,
      name,
      user_type,
      company,
      director_name,
      director_email,
      director_phone,
    } = userCreateDto;

    const user = new User();
    user.email = email;
    user.name = name;
    user.user_type = UserType[user_type] || undefined;
    user.encrypted_password = await bcrypt.hash(`${password}`, 10);
    user.uuid = uuid;

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

  async validateUserPassword(userCreateDto: UserCreateDto): Promise<User> {
    const { email, password } = (userCreateDto as any).user;

    const user = await this.findOne({ email });
    if (user && (await user.validateUserPassword(password))) {
      return user;
    }
    return null;
  }

  async findAll(): Promise<User[]> {
    const users = await this.find({
      order: {
        createdAt: 'ASC',
      },
    });
    return users;
  }

  async me(email: string): Promise<User> {
    const user = await this.findOne({
      where: {
        email,
      },
    });
    return user;
  }

  async findByUuid(uuid: string): Promise<User> {
    const user = await this.findOne({
      where: {
        uuid,
      },
    });
    return user;
  }

  async saveBillingKey(
    billingResult: { [key: string]: string },
    currentApiUser: User,
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

  async updateUser(currentApiUser: User, filename: string, userUpdateDto) {
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
    } = userUpdateDto;

    const user = currentApiUser;

    if (!user) {
      throw new ConflictException('유저정보가 조회되지 않습니다');
    }

    // user.profile_img = `${process.env.SERVER_ADDRESS}/images/${filename}`;
    if (filename !== '') {
      user.profile_img = filename;
    }

    try {
      user.basic_charge = basicCharge;
      user.basic_km = basicKm;
      user.bus_old = busOld;
      user.bus_type = busType;
      user.charge_per_km = chargePerKm;
      user.company_name = company;
      user.drivable_region = drivableRegion;
      user.night_begin = nightBegin;
      user.night_end = nightEnd;
      user.night_charge = nightCharge;
      user.service_charge = serviceCharge;
      user.people_available = peopleAvailable;
      user.charge_per_day = chargePerDay;
      user.bus_number = busNumber;
      user.introduce = introduce;
      user.peak_charge = peakCharge;
      user.peak_charge_per_km = peakChargePerKm;
      user.sanitizer = sanitizer === 'true';
      user.wifi = wifi === 'true';
      user.movie = movie === 'true';
      user.audio = audio === 'true';
      user.usb = usb === 'true';
      user.fridge = fridge === 'true';
      user.bank = bank;
      user.bank_account = bank_account;

      user.save();
    } catch (err) {
      throw new ConflictException(err);
    }

    return user;
  }

  async getOneUserById(param: number): Promise<User> {
    const user = await this.findOne({
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
  ): Promise<User[]> {
    const { departure } = schedule[0];
    const region = (departure as string).split(' ')[0];

    const drivers = await this.createQueryBuilder('User')
      .where(`drivable_region @> ARRAY['${region}']`)
      .andWhere(
        new Brackets((qb) => {
          qb.where('user_type = :driver', { driver: 'driver' });
        }),
      )
      .take(3)
      .skip(3 * (page - 1))
      .getMany();

    return drivers;
  }
}
