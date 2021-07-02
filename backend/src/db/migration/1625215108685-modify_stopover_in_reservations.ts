import { MigrationInterface, QueryRunner } from 'typeorm';

export class modifyStopoverInReservations1625215108685
  implements MigrationInterface
{
  name = 'modifyStopoverInReservations1625215108685';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "reservations" DROP COLUMN "stopover"`,
    );
    await queryRunner.query(
      `ALTER TABLE "reservations" ADD "stopover" text array`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "reservations" DROP COLUMN "stopover"`,
    );
    await queryRunner.query(
      `ALTER TABLE "reservations" ADD "stopover" character varying`,
    );
  }
}
