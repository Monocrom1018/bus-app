import { MigrationInterface, QueryRunner } from 'typeorm';

export class addDrivableDateAndDrivableLegionOnUser1623310715917
  implements MigrationInterface
{
  name = 'addDrivableDateAndDrivableLegionOnUser1623310715917';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ADD "drivable_date" text array NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD "drivable_legion" text array NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" DROP COLUMN "drivable_legion"`,
    );
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "drivable_date"`);
  }
}
