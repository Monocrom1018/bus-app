import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { UsersEntity } from '@users/users.entity';
import { UserType } from '@users/enum';
// import * as AWS from 'aws-sdk';

export default class CreateUsers implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    // const client = new AWS.CognitoIdentityServiceProvider({
    //   region: 'local',
    //   accessKeyId: 'local',
    //   secretAccessKey: 'local',
    //   endpoint: 'http://localhost:9229',
    // });

    let userIndex = 1;
    const regions1 = [
      '서울',
      '광주',
      '경남',
      '강원',
      '대전',
      '인천',
      '충남',
      '전남',
    ];

    // 추후에 세종 -> 세종특별자치시 / 제주 -> 제주특별자치시 로 변경
    const regions2 = [
      '경기',
      '경북',
      '대구',
      '전북',
      '충북',
      '부산',
      '울산',
      '세종',
      '제주',
    ];
    await factory(UsersEntity)()
      .map(async (user) => {
        user.email =
          userIndex < 100
            ? `backPack${`0${userIndex++}`.slice(-2)}@bus.com`
            : `backPack${`${userIndex++}`}@bus.com`;
        user.user_type = userIndex < 11 ? UserType.NORMAL : UserType.DRIVER;
        user.registration_confirmed = false;
        user.drivable_region = []
          .concat(regions1[Math.floor(Math.random() * 8)])
          .concat(regions2[Math.floor(Math.random() * 8)]);

        if (userIndex < 100) {
          user.basic_km = 100;
          user.basic_charge = 300000;
          user.charge_per_km = 1000;
          user.service_charge = 50000;
          user.people_available = 20;
          user.bus_old = 2020;
          user.bus_type = '미니우등';
          user.company_name = '햇살운수';
          user.night_begin = 22;
          user.night_end = 4;
          user.night_charge = 30000;
          user.peak_charge = 400000;
          user.peak_charge_per_km = 1500;
        }

        if (userIndex >= 100 && userIndex < 200) {
          user.basic_km = 120;
          user.basic_charge = 350000;
          user.charge_per_km = 1050;
          user.service_charge = 30000;
          user.people_available = 40;
          user.bus_old = 2015;
          user.bus_type = '대형우등';
          user.company_name = '달빛여행사';
          user.night_begin = 24;
          user.night_end = 5;
          user.night_charge = 50000;
          user.peak_charge = 450000;
          user.peak_charge_per_km = 1300;
        }

        if (userIndex >= 200) {
          user.basic_km = 140;
          user.basic_charge = 400000;
          user.charge_per_km = 1100;
          user.service_charge = 70000;
          user.people_available = 28;
          user.bus_old = 2017;
          user.bus_type = '중형';
          user.company_name = '바람관광';
          user.night_begin = 23;
          user.night_end = 4;
          user.night_charge = 40000;
          user.peak_charge = 600000;
          user.peak_charge_per_km = 1700;
        }

        // map
        const userSub = await Promise.resolve().then(() => {
          const uuid = '123asd123asd123qwe';
          // client.signUp(
          //   {
          //     ClientId: 'dnylzvu9n5i1d7kxrroybibv0',
          //     Username: `${user.email}`,
          //     Password: '123qwe!',
          //     UserAttributes: [{ Name: 'email', Value: `${user.email}` }],
          //   },
          //   (err, data) => {
          //     if (err) {
          //       console.log(err);
          //     } else {
          //       console.log(data);
          //       uuid = data.UserSub;
          //     }
          //   },
          // );
          return uuid;
        });

        return user;
      })
      .createMany(300);
  }
}
