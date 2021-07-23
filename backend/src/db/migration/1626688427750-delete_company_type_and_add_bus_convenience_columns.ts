import {MigrationInterface, QueryRunner} from "typeorm";

export class deleteCompanyTypeAndAddBusConvenienceColumns1626688427750 implements MigrationInterface {
    name = 'deleteCompanyTypeAndAddBusConvenienceColumns1626688427750'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "card_registerd"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "card_registered" boolean DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "users" ADD "sanitizer" boolean`);
        await queryRunner.query(`ALTER TABLE "users" ADD "wifi" boolean`);
        await queryRunner.query(`ALTER TABLE "users" ADD "usb" boolean`);
        await queryRunner.query(`ALTER TABLE "users" ADD "fridge" boolean`);
        await queryRunner.query(`ALTER TABLE "users" ADD "movie" boolean`);
        await queryRunner.query(`ALTER TABLE "users" ADD "audio" boolean`);
        await queryRunner.query(`ALTER TYPE "users_user_type_enum" RENAME TO "users_user_type_enum_old"`);
        await queryRunner.query(`CREATE TYPE "users_user_type_enum" AS ENUM('normal', 'driver')`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "user_type" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "user_type" TYPE "users_user_type_enum" USING "user_type"::"text"::"users_user_type_enum"`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "user_type" SET DEFAULT 'normal'`);
        await queryRunner.query(`DROP TYPE "users_user_type_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "users_user_type_enum_old" AS ENUM('normal', 'driver', 'company')`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "user_type" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "user_type" TYPE "users_user_type_enum_old" USING "user_type"::"text"::"users_user_type_enum_old"`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "user_type" SET DEFAULT 'normal'`);
        await queryRunner.query(`DROP TYPE "users_user_type_enum"`);
        await queryRunner.query(`ALTER TYPE "users_user_type_enum_old" RENAME TO "users_user_type_enum"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "audio"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "movie"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "fridge"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "usb"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "wifi"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "sanitizer"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "card_registered"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "card_registerd" boolean DEFAULT false`);
    }

}
