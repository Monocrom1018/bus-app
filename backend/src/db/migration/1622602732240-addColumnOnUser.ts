import {MigrationInterface, QueryRunner} from "typeorm";

export class addColumnOnUser1622602732240 implements MigrationInterface {
    name = 'addColumnOnUser1622602732240'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "profile_img" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "profile_img"`);
    }

}
