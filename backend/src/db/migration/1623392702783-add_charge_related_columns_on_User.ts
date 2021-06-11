import { MigrationInterface, QueryRunner } from 'typeorm';

export class addChargeRelatedColumnsOnUser1623392702783
  implements MigrationInterface
{
  name = 'addChargeRelatedColumnsOnUser1623392702783';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" ADD "basic_km" integer`);
    await queryRunner.query(`ALTER TABLE "users" ADD "basic_charge" integer`);
    await queryRunner.query(`ALTER TABLE "users" ADD "charge_per_km" integer`);
    await queryRunner.query(`ALTER TABLE "users" ADD "service_charge" integer`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "service_charge"`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "charge_per_km"`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "basic_charge"`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "basic_km"`);
  }
}
