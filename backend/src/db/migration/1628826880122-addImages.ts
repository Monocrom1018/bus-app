import { MigrationInterface, QueryRunner } from 'typeorm';

export class addImages1628826880122 implements MigrationInterface {
  name = 'addImages1628826880122';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" RENAME COLUMN "profile_img" TO "profile"`,
    );
    await queryRunner.query(
      `CREATE TYPE "images_image_type_enum" AS ENUM('normal', 'main')`,
    );
    await queryRunner.query(
      `CREATE TABLE "images" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "imagable_type" character varying, "imagable_id" integer, "key" character varying, "level" character varying DEFAULT 'public', "image_type" "images_image_type_enum", "user_id" integer, CONSTRAINT "PK_1fe148074c6a1a91b63cb9ee3c9" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "images" ADD CONSTRAINT "FK_decdf86f650fb765dac7bd091a6" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "images" DROP CONSTRAINT "FK_decdf86f650fb765dac7bd091a6"`,
    );
    await queryRunner.query(`DROP TABLE "images"`);
    await queryRunner.query(`DROP TYPE "images_image_type_enum"`);
    await queryRunner.query(
      `ALTER TABLE "users" RENAME COLUMN "profile" TO "profile_img"`,
    );
  }
}
