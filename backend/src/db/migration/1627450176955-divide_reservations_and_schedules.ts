import {MigrationInterface, QueryRunner} from "typeorm";

export class divideReservationsAndSchedules1627450176955 implements MigrationInterface {
    name = 'divideReservationsAndSchedules1627450176955'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "schedules" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "departure" character varying NOT NULL, "departure_date" TIMESTAMP NOT NULL, "stopover" text array, "destination" character varying NOT NULL, "return_date" TIMESTAMP NOT NULL, "last_destination" character varying, "distance" integer NOT NULL, "reservationId" integer, CONSTRAINT "PK_7e33fc2ea755a5765e3564e66dd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "reservations" DROP COLUMN "lastDestination"`);
        await queryRunner.query(`ALTER TABLE "reservations" DROP COLUMN "stopover"`);
        await queryRunner.query(`ALTER TABLE "reservations" DROP COLUMN "price"`);
        await queryRunner.query(`ALTER TABLE "reservations" DROP COLUMN "accompany"`);
        await queryRunner.query(`ALTER TABLE "reservations" DROP COLUMN "returnDate"`);
        await queryRunner.query(`ALTER TABLE "reservations" DROP COLUMN "destination"`);
        await queryRunner.query(`ALTER TABLE "reservations" DROP COLUMN "departureDate"`);
        await queryRunner.query(`ALTER TABLE "reservations" DROP COLUMN "departure"`);
        await queryRunner.query(`ALTER TABLE "reservations" ADD "total_price" integer`);
        await queryRunner.query(`ALTER TABLE "reservations" ADD "total_distance" integer`);
        await queryRunner.query(`ALTER TABLE "users" ADD "bank" character varying`);
        await queryRunner.query(`ALTER TABLE "users" ADD "account_number" character varying`);
        await queryRunner.query(`ALTER TABLE "reservations" ALTER COLUMN "people" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "schedules" ADD CONSTRAINT "FK_ff33ca96e7e4a92a41810534b00" FOREIGN KEY ("reservationId") REFERENCES "reservations"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "schedules" DROP CONSTRAINT "FK_ff33ca96e7e4a92a41810534b00"`);
        await queryRunner.query(`ALTER TABLE "reservations" ALTER COLUMN "people" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "account_number"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "bank"`);
        await queryRunner.query(`ALTER TABLE "reservations" DROP COLUMN "total_distance"`);
        await queryRunner.query(`ALTER TABLE "reservations" DROP COLUMN "total_price"`);
        await queryRunner.query(`ALTER TABLE "reservations" ADD "departure" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "reservations" ADD "departureDate" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "reservations" ADD "destination" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "reservations" ADD "returnDate" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "reservations" ADD "accompany" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "reservations" ADD "price" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "reservations" ADD "stopover" text array`);
        await queryRunner.query(`ALTER TABLE "reservations" ADD "lastDestination" character varying`);
        await queryRunner.query(`DROP TABLE "schedules"`);
    }

}
