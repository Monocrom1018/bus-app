import { MigrationInterface, QueryRunner } from 'typeorm';

export class addRegistrationConfirmOnUser1623032219986
  implements MigrationInterface
{
  name = 'addRegistrationConfirmOnUser1623032219986';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" DROP COLUMN "password_confirmation"`,
    );
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "zipcode"`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "address1"`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "address2"`);
    await queryRunner.query(
      `ALTER TABLE "users" ADD "registration_confirmed" boolean`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" DROP COLUMN "registration_confirmed"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD "address2" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD "address1" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD "zipcode" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD "password_confirmation" character varying`,
    );
  }
}
