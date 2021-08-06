import {MigrationInterface, QueryRunner} from "typeorm";

export class addDirectorRelatedColumnsToUSER1626922901362 implements MigrationInterface {
    name = 'addDirectorRelatedColumnsToUSER1626922901362'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "director_name" character varying`);
        await queryRunner.query(`ALTER TABLE "users" ADD "director_email" character varying`);
        await queryRunner.query(`ALTER TABLE "users" ADD "director_phone" integer`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "director_phone"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "director_email"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "director_name"`);
    }

}
