import {MigrationInterface, QueryRunner} from "typeorm";

export class addCardColumnsToUser1625716889879 implements MigrationInterface {
    name = 'addCardColumnsToUser1625716889879'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "card_registerd" boolean DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "users" ADD "card_billing_key" character varying`);
        await queryRunner.query(`ALTER TABLE "users" ADD "card_number" character varying`);
        await queryRunner.query(`ALTER TABLE "users" ADD "card_company" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "card_company"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "card_number"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "card_billing_key"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "card_registerd"`);
    }

}
