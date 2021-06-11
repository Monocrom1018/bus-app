import { MigrationInterface, QueryRunner } from 'typeorm';

export class addDrivableDateAndDrivableLegionOnUser1623375844240
  implements MigrationInterface
{
  name = 'addDrivableDateAndDrivableLegionOnUser1623375844240';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ADD "drivable_date" text array`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD "drivable_legion" text array`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" DROP COLUMN "drivable_legion"`,
    );
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "drivable_date"`);
  }
}
