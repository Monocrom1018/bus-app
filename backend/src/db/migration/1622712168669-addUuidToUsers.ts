import {MigrationInterface, QueryRunner} from "typeorm";

export class addUuidToUsers1622712168669 implements MigrationInterface {
    name = 'addUuidToUsers1622712168669'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "uuid" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "uuid"`);
    }

}
