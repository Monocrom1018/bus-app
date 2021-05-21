import {MigrationInterface, QueryRunner} from "typeorm";

export class addReservationsUsers1621410914672 implements MigrationInterface {
    name = 'addReservationsUsers1621410914672'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "reservations_users" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "reservationId" integer, "userId" integer, CONSTRAINT "PK_5a36e072fb302e389707a80f145" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "reservations_users" ADD CONSTRAINT "FK_930a1cb0cde9abf7a47bfeede94" FOREIGN KEY ("reservationId") REFERENCES "reservations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "reservations_users" ADD CONSTRAINT "FK_52ecf9f5e4830bb95a921ae9316" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reservations_users" DROP CONSTRAINT "FK_52ecf9f5e4830bb95a921ae9316"`);
        await queryRunner.query(`ALTER TABLE "reservations_users" DROP CONSTRAINT "FK_930a1cb0cde9abf7a47bfeede94"`);
        await queryRunner.query(`DROP TABLE "reservations_users"`);
    }

}
