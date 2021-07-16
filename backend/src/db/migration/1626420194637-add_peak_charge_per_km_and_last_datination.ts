import {MigrationInterface, QueryRunner} from "typeorm";

export class addPeakChargePerKmAndLastDatination1626420194637 implements MigrationInterface {
    name = 'addPeakChargePerKmAndLastDatination1626420194637'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reservations" ADD "lastDestination" character varying`);
        await queryRunner.query(`ALTER TABLE "users" ADD "peak_charge_per_km" integer`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "peak_charge_per_km"`);
        await queryRunner.query(`ALTER TABLE "reservations" DROP COLUMN "lastDestination"`);
    }

}
