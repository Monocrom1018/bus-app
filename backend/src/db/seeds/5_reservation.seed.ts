import { Connection, getRepository } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import { ReservationsEntity } from '@reservations/reservations.entity';
import { UsersEntity } from '@users/users.entity';
import { SchedulesEntity } from '@schedules/schedules.entity';
export default class CreateReservations implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {

    const status = ['수락대기중', '수락', '거절'];
    const departureList = [
      '서울 은평구 불광동 북한산둘레길 구름정원길8구간',
      '서울 강남구 신사동 668-33 압구정로데오거리',
      '서울 용산구 용산동2가 산 1-3 남산서울타워',
      '경기 고양시 덕양구 향동동 향동천',
      '서울 강북구 도봉로67길 18 숙이네',
      '서울 용산구 한강대로 405 서울역',
    ]
    const destinationList = [
      '부산 해운대구 중동 1015 해운대해수욕장',
      '부산 중구 자갈치해안로 52 자갈치시장',
      '강원 춘천시 영서로 2663 소양강스카이워크',
      '강원 강릉시 창해로 514 경포해변',
      '경북 영주시 봉현면 테라피로 209-1 국립산림치유원',
      '충남 보령시 머드로 123 대천해수욕장',
    ]
    
    const reservations = await factory(ReservationsEntity)()
      .map(async (reservation) => {
        const normal = await getRepository(UsersEntity)
          .createQueryBuilder('user')
          .where('user.email = :email', { email: 'normalprod01@bus.com' })
          .orWhere('user.email = :email', { email: 'normaldev01@bus.com' })
          .getOne();

        const driver = await getRepository(UsersEntity)
          .createQueryBuilder('user')
          .where('user.email = :email', { email: 'driverprod01@bus.com' })
          .orWhere('user.email = :email', { email: 'driverdev01@bus.com' })
          .getOne();

        if(normal && driver) {
          reservation.user = normal;
          reservation.driver = driver;
        }
        
        if(!normal && !driver) {
          const randomNormal = await getRepository(UsersEntity)
            .createQueryBuilder('user')
            .where('user.user_type = :user_type', { user_type: 'normal' })
            .orderBy("RANDOM()")
            .limit(1)
            .getOne();

          const randomDriver = await getRepository(UsersEntity)
            .createQueryBuilder('user')
            .where('user.user_type = :user_type', { user_type: 'driver' })
            .orderBy("RANDOM()")
            .limit(1)
            .getOne();

          reservation.user = randomNormal;
          reservation.driver = randomDriver;
        }

        reservation.total_price = 300000;
        reservation.total_distance = 395;
        reservation.departureDate = '2021-11-30T03:00:00.000Z';
        reservation.departureTime = '0 00';
        reservation.returnDate = '2021-11-30T03:00:00.000Z';
        reservation.returnTime = '0 00';
        reservation.status = status[Math.floor(Math.random() * 3)];

        return reservation;
      })
      .createMany(6);

      // reservation 에 종속되어있는 schedule 생성
      for (let i = 0; i < reservations.length; i++) {
        await factory(SchedulesEntity)()
          .map(async (schedule) => {
            schedule.departure = departureList[i];
            schedule.stopover = [];
            schedule.destination = destinationList[i];
            schedule.distance = 395;
            schedule.reservation = reservations[i];
            schedule.day = '21년 011월 30일';
            return schedule;
          })
          .create();

        await factory(SchedulesEntity)()
          .map(async (schedule) => {
            schedule.departure = destinationList[i];
            schedule.stopover = [];
            schedule.destination = departureList[i];
            schedule.distance = 395;
            schedule.reservation = reservations[i];
            schedule.day = '21년 11월 30일';
            return schedule;
          })
          .create();
    }
  }
}
