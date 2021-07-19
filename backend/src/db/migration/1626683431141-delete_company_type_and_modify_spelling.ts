import {MigrationInterface, QueryRunner} from "typeorm";

export class deleteCompanyTypeAndModifySpelling1626683431141 implements MigrationInterface {
    name = 'deleteCompanyTypeAndModifySpelling1626683431141'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "card_registerd" TO "card_registered"`);
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
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "card_registered" TO "card_registerd"`);
    }

}
