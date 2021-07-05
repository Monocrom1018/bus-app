import { MigrationInterface, QueryRunner } from 'typeorm';

export class addBusRelatedColumnsOnUser1623830148341
  implements MigrationInterface
{
  name = 'addBusRelatedColumnsOnUser1623830148341';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ADD "bus_type" character varying`,
    );
    await queryRunner.query(`ALTER TABLE "users" ADD "bus_old" integer`);
    await queryRunner.query(
      `ALTER TABLE "users" ADD "people_available" integer`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD "company_name" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "company_name"`);
    await queryRunner.query(
      `ALTER TABLE "users" DROP COLUMN "people_available"`,
    );
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "bus_old"`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "bus_type"`);
  }
}
