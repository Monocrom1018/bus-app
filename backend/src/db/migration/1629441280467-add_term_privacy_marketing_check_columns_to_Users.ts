import {MigrationInterface, QueryRunner} from "typeorm";

export class addTermPrivacyMarketingCheckColumnsToUsers1629441280467 implements MigrationInterface {
    name = 'addTermPrivacyMarketingCheckColumnsToUsers1629441280467'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "term_check" boolean`);
        await queryRunner.query(`ALTER TABLE "users" ADD "privacy_check" boolean`);
        await queryRunner.query(`ALTER TABLE "users" ADD "marketing_check" boolean`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "marketing_check"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "privacy_check"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "term_check"`);
    }

}
