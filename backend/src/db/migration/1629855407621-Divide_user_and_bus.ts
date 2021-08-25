import {MigrationInterface, QueryRunner} from "typeorm";

export class DivideUserAndBus1629855407621 implements MigrationInterface {
    name = 'DivideUserAndBus1629855407621'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_b1aae736b7c5d6925efa8563527"`);
        await queryRunner.query(`CREATE TABLE "buses" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "id" SERIAL NOT NULL, "bus_type" character varying, "bus_old" integer, "people_available" integer, "bus_number" character varying, "sanitizer" boolean, "wifi" boolean, "usb" boolean, "fridge" boolean, "movie" boolean, "audio" boolean, "user_id" integer, CONSTRAINT "UQ_ddebc0eeba64a019ae072975947" UNIQUE ("id"), CONSTRAINT "REL_a777d26b0078c5369316692966" UNIQUE ("user_id"), CONSTRAINT "PK_ddebc0eeba64a019ae072975947" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "audio"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "movie"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "fridge"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "usb"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "wifi"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "sanitizer"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "people_available"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "bus_old"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "bus_number"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "bus_type"`);
        await queryRunner.query(`ALTER TABLE "images" ADD "bus_id" integer`);
        await queryRunner.query(`ALTER TABLE "users" ADD "bus_id" integer`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_39b29bd3a8e8eccaf613c8db9da" UNIQUE ("bus_id")`);
        await queryRunner.query(`ALTER TABLE "buses" ADD CONSTRAINT "FK_a777d26b0078c53693166929669" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "images" ADD CONSTRAINT "FK_f06c63aef6d44d28636e18c40ec" FOREIGN KEY ("bus_id") REFERENCES "buses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_39b29bd3a8e8eccaf613c8db9da" FOREIGN KEY ("bus_id") REFERENCES "buses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_39b29bd3a8e8eccaf613c8db9da"`);
        await queryRunner.query(`ALTER TABLE "images" DROP CONSTRAINT "FK_2eb9a03dcac44dca05aed8a8c54"`);
        await queryRunner.query(`ALTER TABLE "buses" DROP CONSTRAINT "FK_a777d26b0078c53693166929669"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_39b29bd3a8e8eccaf613c8db9da"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "bus_id"`);
        await queryRunner.query(`ALTER TABLE "images" DROP COLUMN "bus_id"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "bus_type" character varying`);
        await queryRunner.query(`ALTER TABLE "users" ADD "bus_number" character varying`);
        await queryRunner.query(`ALTER TABLE "users" ADD "bus_old" integer`);
        await queryRunner.query(`ALTER TABLE "users" ADD "people_available" integer`);
        await queryRunner.query(`ALTER TABLE "users" ADD "sanitizer" boolean`);
        await queryRunner.query(`ALTER TABLE "users" ADD "wifi" boolean`);
        await queryRunner.query(`ALTER TABLE "users" ADD "usb" boolean`);
        await queryRunner.query(`ALTER TABLE "users" ADD "fridge" boolean`);
        await queryRunner.query(`ALTER TABLE "users" ADD "movie" boolean`);
        await queryRunner.query(`ALTER TABLE "users" ADD "audio" boolean`);
        await queryRunner.query(`DROP TABLE "buses"`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_b1aae736b7c5d6925efa8563527" FOREIGN KEY ("image_id") REFERENCES "images"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
