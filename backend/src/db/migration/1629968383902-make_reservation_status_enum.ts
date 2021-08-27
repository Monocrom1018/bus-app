import {MigrationInterface, QueryRunner} from "typeorm";

export class makeReservationStatusEnum1629968383902 implements MigrationInterface {
    name = 'makeReservationStatusEnum1629968383902'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reservations" DROP COLUMN "status"`);
        await queryRunner.query(`CREATE TYPE "reservations_status_enum" AS ENUM('수락대기중', '수락', '거절')`);
        await queryRunner.query(`ALTER TABLE "reservations" ADD "status" "reservations_status_enum" NOT NULL DEFAULT '수락대기중'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reservations" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "reservations_status_enum"`);
        await queryRunner.query(`ALTER TABLE "reservations" ADD "status" character varying NOT NULL`);
    }

}