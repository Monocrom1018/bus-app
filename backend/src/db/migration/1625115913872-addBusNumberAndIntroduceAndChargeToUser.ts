import { MigrationInterface, QueryRunner } from 'typeorm';

export class addBusNumberAndIntroduceToUser1625115913872
  implements MigrationInterface
{
  name = 'addBusNumberAndIntroduceToUser1625115913872';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ADD "bus_number" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD "introduce" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD "charge_per_day" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "introduce"`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "bus_number"`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "charge_per_day"`);
  }
}
