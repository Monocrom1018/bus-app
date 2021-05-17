import {MigrationInterface, QueryRunner} from "typeorm";

export class addReservations1621222324812 implements MigrationInterface {
    name = 'addReservations1621222324812'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "reservations" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "departure" character varying NOT NULL, "stopover" character varying, "destination" character varying NOT NULL, "people" integer NOT NULL, "accompany" character varying NOT NULL, "price" integer NOT NULL, "status" character varying NOT NULL, CONSTRAINT "PK_da95cef71b617ac35dc5bcda243" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "reservations_users" ("reservation" integer NOT NULL, "user" integer NOT NULL, CONSTRAINT "PK_c1074d58cb1b694b0a02a7430e9" PRIMARY KEY ("reservation", "user"))`);
        await queryRunner.query(`CREATE INDEX "IDX_3d2064d4e2477cae676af3a484" ON "reservations_users" ("reservation") `);
        await queryRunner.query(`CREATE INDEX "IDX_06031ad9d886697bb4a78aa73f" ON "reservations_users" ("user") `);
        await queryRunner.query(`ALTER TABLE "reservations_users" ADD CONSTRAINT "FK_3d2064d4e2477cae676af3a484a" FOREIGN KEY ("reservation") REFERENCES "reservations"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "reservations_users" ADD CONSTRAINT "FK_06031ad9d886697bb4a78aa73f1" FOREIGN KEY ("user") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reservations_users" DROP CONSTRAINT "FK_06031ad9d886697bb4a78aa73f1"`);
        await queryRunner.query(`ALTER TABLE "reservations_users" DROP CONSTRAINT "FK_3d2064d4e2477cae676af3a484a"`);
        await queryRunner.query(`DROP INDEX "IDX_06031ad9d886697bb4a78aa73f"`);
        await queryRunner.query(`DROP INDEX "IDX_3d2064d4e2477cae676af3a484"`);
        await queryRunner.query(`DROP TABLE "reservations_users"`);
        await queryRunner.query(`DROP TABLE "reservations"`);
    }

}
