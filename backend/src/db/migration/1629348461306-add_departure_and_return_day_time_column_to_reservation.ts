import {MigrationInterface, QueryRunner} from "typeorm";

export class addDepartureAndReturnDayTimeColumnToReservation1629348461306 implements MigrationInterface {
    name = 'addDepartureAndReturnDayTimeColumnToReservation1629348461306'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reservations" ADD "departureDate" character varying`);
        await queryRunner.query(`ALTER TABLE "reservations" ADD "departureTime" character varying`);
        await queryRunner.query(`ALTER TABLE "reservations" ADD "returnDate" character varying`);
        await queryRunner.query(`ALTER TABLE "reservations" ADD "returnTime" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reservations" DROP COLUMN "returnTime"`);
        await queryRunner.query(`ALTER TABLE "reservations" DROP COLUMN "returnDate"`);
        await queryRunner.query(`ALTER TABLE "reservations" DROP COLUMN "departureTime"`);
        await queryRunner.query(`ALTER TABLE "reservations" DROP COLUMN "departureDate"`);
    }

}
