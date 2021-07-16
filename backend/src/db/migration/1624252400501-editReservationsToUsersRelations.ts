import { MigrationInterface, QueryRunner } from 'typeorm';

export class editReservationsToUsersRelations1624252400501
  implements MigrationInterface
{
  name = 'editReservationsToUsersRelations1624252400501';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "reservations" ADD "userId" integer`);
    await queryRunner.query(
      `ALTER TABLE "reservations" ADD "driverId" integer`,
    );
    await queryRunner.query(
      `ALTER TABLE "reservations" ADD CONSTRAINT "FK_aa0e1cc2c4f54da32bf8282154c" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "reservations" ADD CONSTRAINT "FK_01358135349eebc2111cbebb990" FOREIGN KEY ("driverId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "reservations" DROP CONSTRAINT "FK_01358135349eebc2111cbebb990"`,
    );
    await queryRunner.query(
      `ALTER TABLE "reservations" DROP CONSTRAINT "FK_aa0e1cc2c4f54da32bf8282154c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "reservations" DROP COLUMN "driverId"`,
    );
    await queryRunner.query(`ALTER TABLE "reservations" DROP COLUMN "userId"`);
  }
}
