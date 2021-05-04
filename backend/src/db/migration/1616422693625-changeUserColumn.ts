import { MigrationInterface, QueryRunner } from 'typeorm';

export class changeUserColumn1616422693625 implements MigrationInterface {
  name = 'changeUserColumn1616422693625';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "phone"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" ADD "phone" character varying`);
  }
}
