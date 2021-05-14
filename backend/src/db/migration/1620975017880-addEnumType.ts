import { MigrationInterface, QueryRunner } from 'typeorm';

export class addRelations1620975017880 implements MigrationInterface {
  name = 'addRelations1620975017880';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TYPE "public"."users_user_type_enum" RENAME TO "users_user_type_enum_old"`,
    );
    await queryRunner.query(
      `CREATE TYPE "users_user_type_enum" AS ENUM('normal', 'driver', 'company')`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "user_type" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "user_type" TYPE "users_user_type_enum" USING "user_type"::"text"::"users_user_type_enum"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "user_type" SET DEFAULT 'normal'`,
    );
    await queryRunner.query(`DROP TYPE "users_user_type_enum_old"`);
    await queryRunner.query(`COMMENT ON COLUMN "users"."user_type" IS NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`COMMENT ON COLUMN "users"."user_type" IS NULL`);
    await queryRunner.query(
      `CREATE TYPE "users_user_type_enum_old" AS ENUM('normal', 'driver')`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "user_type" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "user_type" TYPE "users_user_type_enum_old" USING "user_type"::"text"::"users_user_type_enum_old"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "user_type" SET DEFAULT 'normal'`,
    );
    await queryRunner.query(`DROP TYPE "users_user_type_enum"`);
    await queryRunner.query(
      `ALTER TYPE "users_user_type_enum_old" RENAME TO  "users_user_type_enum"`,
    );
  }
}
