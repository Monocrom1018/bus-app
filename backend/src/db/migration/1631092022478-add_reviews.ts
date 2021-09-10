import {MigrationInterface, QueryRunner} from "typeorm";

export class addReviews1631092022478 implements MigrationInterface {
    name = 'addReviews1631092022478'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "reviews" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "id" SERIAL NOT NULL, "content" character varying, "rating" integer, "userId" integer, "driverId" integer, "reservationId" integer, CONSTRAINT "REL_6067e9120f35fc449acc410ec1" UNIQUE ("reservationId"), CONSTRAINT "PK_231ae565c273ee700b283f15c1d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "reservations" ADD "reviewId" integer`);
        await queryRunner.query(`ALTER TABLE "reservations" ADD CONSTRAINT "UQ_6092dc76fd1f8116f740083997c" UNIQUE ("reviewId")`);
        await queryRunner.query(`ALTER TYPE "reservations_status_enum" RENAME TO "reservations_status_enum_old"`);
        await queryRunner.query(`CREATE TYPE "reservations_status_enum" AS ENUM('수락대기중', '수락', '거절', '완료')`);
        await queryRunner.query(`ALTER TABLE "reservations" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "reservations" ALTER COLUMN "status" TYPE "reservations_status_enum" USING "status"::"text"::"reservations_status_enum"`);
        await queryRunner.query(`ALTER TABLE "reservations" ALTER COLUMN "status" SET DEFAULT '수락대기중'`);
        await queryRunner.query(`DROP TYPE "reservations_status_enum_old"`);
        await queryRunner.query(`ALTER TABLE "reviews" ADD CONSTRAINT "FK_7ed5659e7139fc8bc039198cc1f" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "reviews" ADD CONSTRAINT "FK_44dad78449ef449cd59f6a47402" FOREIGN KEY ("driverId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "reviews" ADD CONSTRAINT "FK_6067e9120f35fc449acc410ec1a" FOREIGN KEY ("reservationId") REFERENCES "reservations"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "reservations" ADD CONSTRAINT "FK_6092dc76fd1f8116f740083997c" FOREIGN KEY ("reviewId") REFERENCES "reviews"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reservations" DROP CONSTRAINT "FK_6092dc76fd1f8116f740083997c"`);
        await queryRunner.query(`ALTER TABLE "reviews" DROP CONSTRAINT "FK_6067e9120f35fc449acc410ec1a"`);
        await queryRunner.query(`ALTER TABLE "reviews" DROP CONSTRAINT "FK_44dad78449ef449cd59f6a47402"`);
        await queryRunner.query(`ALTER TABLE "reviews" DROP CONSTRAINT "FK_7ed5659e7139fc8bc039198cc1f"`);
        await queryRunner.query(`CREATE TYPE "reservations_status_enum_old" AS ENUM('수락대기중', '수락', '거절')`);
        await queryRunner.query(`ALTER TABLE "reservations" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "reservations" ALTER COLUMN "status" TYPE "reservations_status_enum_old" USING "status"::"text"::"reservations_status_enum_old"`);
        await queryRunner.query(`ALTER TABLE "reservations" ALTER COLUMN "status" SET DEFAULT '수락대기중'`);
        await queryRunner.query(`DROP TYPE "reservations_status_enum"`);
        await queryRunner.query(`ALTER TYPE "reservations_status_enum_old" RENAME TO "reservations_status_enum"`);
        await queryRunner.query(`ALTER TABLE "reservations" DROP CONSTRAINT "UQ_6092dc76fd1f8116f740083997c"`);
        await queryRunner.query(`ALTER TABLE "reservations" DROP COLUMN "reviewId"`);
        await queryRunner.query(`DROP TABLE "reviews"`);
    }

}
