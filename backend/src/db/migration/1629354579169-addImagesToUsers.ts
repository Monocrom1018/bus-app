import { MigrationInterface, QueryRunner } from 'typeorm';

export class addImagesToUsers1629354579169 implements MigrationInterface {
  name = 'addImagesToUsers1629354579169';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" RENAME COLUMN "profile" TO "image_id"`,
    );
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "image_id"`);
    await queryRunner.query(`ALTER TABLE "users" ADD "image_id" integer`);
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "UQ_b1aae736b7c5d6925efa8563527" UNIQUE ("image_id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "images" DROP CONSTRAINT "FK_decdf86f650fb765dac7bd091a6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "images" ADD CONSTRAINT "UQ_decdf86f650fb765dac7bd091a6" UNIQUE ("user_id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "FK_b1aae736b7c5d6925efa8563527" FOREIGN KEY ("image_id") REFERENCES "images"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "images" ADD CONSTRAINT "FK_decdf86f650fb765dac7bd091a6" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "images" DROP CONSTRAINT "FK_decdf86f650fb765dac7bd091a6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "FK_b1aae736b7c5d6925efa8563527"`,
    );
    await queryRunner.query(
      `ALTER TABLE "images" DROP CONSTRAINT "UQ_decdf86f650fb765dac7bd091a6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "images" ADD CONSTRAINT "FK_decdf86f650fb765dac7bd091a6" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "UQ_b1aae736b7c5d6925efa8563527"`,
    );
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "image_id"`);
    await queryRunner.query(
      `ALTER TABLE "users" ADD "image_id" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" RENAME COLUMN "image_id" TO "profile"`,
    );
  }
}
