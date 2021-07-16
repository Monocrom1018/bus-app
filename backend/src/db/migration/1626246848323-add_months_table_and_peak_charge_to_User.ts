import {MigrationInterface, QueryRunner} from "typeorm";

export class addMonthsTableAndPeakChargeToUser1626246848323 implements MigrationInterface {
    name = 'addMonthsTableAndPeakChargeToUser1626246848323'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "months" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "month" character varying NOT NULL, "peak" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_6d28d9fc3fd263f08f01fc8f044" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "peaks" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "month" character varying NOT NULL, "peak" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_4ab7385548683b774519559b141" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "users" ADD "peak_charge" integer`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "peak_charge"`);
        await queryRunner.query(`DROP TABLE "peaks"`);
        await queryRunner.query(`DROP TABLE "months"`);
    }

}
