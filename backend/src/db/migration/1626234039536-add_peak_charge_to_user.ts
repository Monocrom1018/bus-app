import {MigrationInterface, QueryRunner} from "typeorm";

export class addPeakChargeToUser1626234039536 implements MigrationInterface {
    name = 'addPeakChargeToUser1626234039536'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "peak_charge" integer`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "peak_charge"`);
    }

}
