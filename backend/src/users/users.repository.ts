import { UserCreateDto } from './dto/user-create.dto';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import {
  Brackets,
  EntityRepository,
  getManager,
  In,
  Raw,
  Repository,
} from 'typeorm';
import { Users as User } from './users.entity';
import * as bcrypt from 'bcryptjs';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  async signUp(userCreateDto: UserCreateDto): Promise<User> {
    const { email, password, name } = userCreateDto;

    const user = new User();
    user.email = email;
    user.name = name;
    user.encrypted_password = await bcrypt.hash(`${password}`, 10);
    // user.password = await this.hashPassword(
    //   `${password}`,
    //   user.encrypted_password,
    // );

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
    const { email, password } = userCreateDto['user'];

    const user = await this.findOne({ email });
    if (user && (await user.validateUserPassword(password))) {
      return user;
    } else {
      return null;
    }
  }

  private async hashPassword(
    password: string,
    encrypted_password: string,
  ): Promise<string> {
    return bcrypt.hash(password, encrypted_password);
  }

  async findAll(): Promise<User[]> {
    const users = await this.find({
      order: {
        createdAt: 'ASC',
      },
    });
    return users;
  }

  async me(): Promise<User> {
    const user = await this.findOne({
      where: {
        email: 'test01@bus.com',
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

  async findTargetDrivers(params): Promise<User[]> {
    const { departureDate, departure } = params;
    const date = departureDate.split(' ')[0];
    const legion = departure.split(' ')[0];

    console.log('출발요일 : ', date);
    console.log('출발지역 : ', legion);

    // TODO 운행날짜(일 ~ 토) -> [ Sun, Mon, Tue, Wed, Thu, Fri, Sat ]
    // TODO 운행지역(17개 지자체) -> [ 서울, 경기, 인천, 강원, 충남, 충북, 전북, 전남, 경북, 경남, 대전, 대구, 세종, 울안, 광주, 제주, 부산 ]

    // const entityManager = getManager();

    // let drivers = await entityManager.query(
    //   `select * from users where
    //     drivable_legion @> ARRAY['${legion}']
    //     AND drivable_date @> ARRAY['${date}']
    //     AND (user_type = 'driver'
    //     OR user_type = 'company')`,
    // );

    // const posts = await this.createQueryBuilder('User')
    //   .where((qb) => {
    //     const subQuery = qb
    //       .subQuery()
    //       .from(User, 'User')
    // .where('user_type = :company', { company: 'company' })
    // .orWhere('user_type = :driver', { driver: 'driver' })
    //       .getQuery();

    //     return subQuery + '.drivable_date @> ARRAY[' + `${date}` + ']';
    //   })
    //   .getMany();

    const drivers = await this.createQueryBuilder('User')
      .where(`drivable_legion @> ARRAY['${legion}']`)
      .andWhere(`drivable_date @> ARRAY['${date}']`)
      .andWhere(
        new Brackets((qb) => {
          qb.where('user_type = :company', { company: 'company' }).orWhere(
            'user_type = :driver',
            { driver: 'driver' },
          );
        }),
      )
      .getMany();

    return drivers;
  }
}
