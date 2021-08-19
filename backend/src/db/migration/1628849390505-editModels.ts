import { MigrationInterface, QueryRunner } from 'typeorm';

export class editModels1628849390505 implements MigrationInterface {
  name = 'editModels1628849390505';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "admin_users" ADD "deleted_at" TIMESTAMP`,
    );
    await queryRunner.query(`ALTER TABLE "faqs" ADD "deleted_at" TIMESTAMP`);
    await queryRunner.query(
      `ALTER TABLE "messages" ADD "deleted_at" TIMESTAMP`,
    );
    await queryRunner.query(`ALTER TABLE "rooms" ADD "deleted_at" TIMESTAMP`);
    await queryRunner.query(`ALTER TABLE "notices" ADD "deleted_at" TIMESTAMP`);
    await queryRunner.query(
      `ALTER TABLE "schedules" ADD "deleted_at" TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE "reservations" ADD "deleted_at" TIMESTAMP`,
    );
    await queryRunner.query(`ALTER TABLE "users" ADD "deleted_at" TIMESTAMP`);
    await queryRunner.query(`ALTER TABLE "images" ADD "deleted_at" TIMESTAMP`);
    await queryRunner.query(`ALTER TABLE "months" ADD "deleted_at" TIMESTAMP`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "months" DROP COLUMN "deleted_at"`);
    await queryRunner.query(`ALTER TABLE "images" DROP COLUMN "deleted_at"`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "deleted_at"`);
    await queryRunner.query(
      `ALTER TABLE "reservations" DROP COLUMN "deleted_at"`,
    );
    await queryRunner.query(`ALTER TABLE "schedules" DROP COLUMN "deleted_at"`);
    await queryRunner.query(`ALTER TABLE "notices" DROP COLUMN "deleted_at"`);
    await queryRunner.query(`ALTER TABLE "rooms" DROP COLUMN "deleted_at"`);
    await queryRunner.query(`ALTER TABLE "messages" DROP COLUMN "deleted_at"`);
    await queryRunner.query(`ALTER TABLE "faqs" DROP COLUMN "deleted_at"`);
    await queryRunner.query(
      `ALTER TABLE "admin_users" DROP COLUMN "deleted_at"`,
    );
  }
}
