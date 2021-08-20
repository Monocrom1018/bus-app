import {MigrationInterface, QueryRunner} from "typeorm";

export class changeColumnDepartureDateToDayAndDeleteLanding1629083409576 implements MigrationInterface {
    name = 'changeColumnDepartureDateToDayAndDeleteLanding1629083409576'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "schedules" DROP COLUMN "landing"`);
        await queryRunner.query(`ALTER TABLE "schedules" DROP COLUMN "return_date"`);
        await queryRunner.query(`ALTER TABLE "schedules" DROP COLUMN "departure_date"`);
        await queryRunner.query(`ALTER TABLE "schedules" ADD "day" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "schedules" DROP COLUMN "day"`);
        await queryRunner.query(`ALTER TABLE "schedules" ADD "departure_date" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "schedules" ADD "return_date" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "schedules" ADD "landing" character varying`);
    }

}
