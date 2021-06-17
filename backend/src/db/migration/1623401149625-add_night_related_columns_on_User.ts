import { MigrationInterface, QueryRunner } from 'typeorm';

export class addNightRelatedColumnsOnUser1623401149625
  implements MigrationInterface
{
  name = 'addNightRelatedColumnsOnUser1623401149625';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" ADD "night_begin" integer`);
    await queryRunner.query(`ALTER TABLE "users" ADD "night_end" integer`);
    await queryRunner.query(`ALTER TABLE "users" ADD "night_charge" integer`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "night_charge"`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "night_end"`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "night_begin"`);
  }
}
