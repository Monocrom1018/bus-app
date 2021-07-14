import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import { Peaks as Peak } from '../../peaks/peaks.entity';

export default class CreatePeaks implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    let monthIndex = 0;
    const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    await factory(Peak)()
      .map(async (peak) => {
        peak.month = `${months[monthIndex]}월`;
        monthIndex++;
        return peak;
      })
      .createMany(12);
  }
}
