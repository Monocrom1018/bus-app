import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { Users as User, UserType } from '../../users/users.entity';

export default class CreateUsers implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    let userIndex = 1;
    await factory(User)()
      .map(async (user) => {
        user.email = `test${('0' + userIndex++).slice(-2)}@bus.com`;
        user.user_type = userIndex < 11 ? UserType.NORMAL : UserType.DRIVER;
        user.registration_confirmed = userIndex < 11 ? true : false;

        if (userIndex > 10 && userIndex < 14) {
          user.drivable_date = ['Sat', 'Sun'];
          user.drivable_legion = ['서울', '경기'];
          user.basic_km = 100;
          user.basic_charge = 300000;
          user.charge_per_km = 1000;
          user.service_charge = 50000;
          user.night_begin = 22;
          user.night_end = 4;
          user.night_charge = 30000;
        }

        if (userIndex >= 14 && userIndex < 17) {
          user.drivable_date = ['Thu', 'Fri'];
          user.drivable_legion = ['충북', '충남'];
          user.basic_km = 120;
          user.basic_charge = 350000;
          user.charge_per_km = 1050;
          user.service_charge = 30000;
          user.night_begin = 24;
          user.night_end = 5;
          user.night_charge = 50000;
        }

        if (userIndex >= 16) {
          user.drivable_date = ['Sat', 'Mon'];
          user.drivable_legion = ['경기', '부산'];
          user.basic_km = 140;
          user.basic_charge = 400000;
          user.charge_per_km = 1100;
          user.service_charge = 70000;
          user.night_begin = 23;
          user.night_end = 4;
          user.night_charge = 40000;
        }

        return user;
      })
      .createMany(20);
  }
}
