import { MigrationInterface, QueryRunner } from 'typeorm';

export class addCreatedAndUpdateToUser1616422989322
  implements MigrationInterface {
  name = 'addCreatedAndUpdateToUser1616422989322';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "created_at"`);
    await queryRunner.query(`ALTER TABLE "user" ADD "phone" character varying`);
  }
}
