import {MigrationInterface, QueryRunner} from "typeorm";

export class addColumnOnReservation1621475999002 implements MigrationInterface {
    name = 'addColumnOnReservation1621475999002'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reservations" ADD "departureDate" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "reservations" ADD "returnDate" TIMESTAMP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reservations" DROP COLUMN "returnDate"`);
        await queryRunner.query(`ALTER TABLE "reservations" DROP COLUMN "departureDate"`);
    }

}
