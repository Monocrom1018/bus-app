import {MigrationInterface, QueryRunner} from "typeorm";

export class createRooms1620897795881 implements MigrationInterface {
    name = 'createRooms1620897795881'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "rooms" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "status" character varying NOT NULL, CONSTRAINT "PK_0368a2d7c215f2d0458a54933f2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "rooms_users_users" ("roomsId" integer NOT NULL, "usersId" integer NOT NULL, CONSTRAINT "PK_ec0e74b500eaad3d92f5179fb01" PRIMARY KEY ("roomsId", "usersId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_cbe951142bc45a33a744256516" ON "rooms_users_users" ("roomsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_6b3c5f4bbfb29a84a57e442af5" ON "rooms_users_users" ("usersId") `);
        await queryRunner.query(`ALTER TABLE "rooms_users_users" ADD CONSTRAINT "FK_cbe951142bc45a33a744256516d" FOREIGN KEY ("roomsId") REFERENCES "rooms"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "rooms_users_users" ADD CONSTRAINT "FK_6b3c5f4bbfb29a84a57e442af54" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rooms_users_users" DROP CONSTRAINT "FK_6b3c5f4bbfb29a84a57e442af54"`);
        await queryRunner.query(`ALTER TABLE "rooms_users_users" DROP CONSTRAINT "FK_cbe951142bc45a33a744256516d"`);
        await queryRunner.query(`DROP INDEX "IDX_6b3c5f4bbfb29a84a57e442af5"`);
        await queryRunner.query(`DROP INDEX "IDX_cbe951142bc45a33a744256516"`);
        await queryRunner.query(`DROP TABLE "rooms_users_users"`);
        await queryRunner.query(`DROP TABLE "rooms"`);
    }

}
