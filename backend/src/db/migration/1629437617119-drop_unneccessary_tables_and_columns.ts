import {MigrationInterface, QueryRunner} from "typeorm";

export class dropUnneccessaryTablesAndColumns1629437617119 implements MigrationInterface {
    name = 'dropUnneccessaryTablesAndColumns1629437617119'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "drivable_date"`);
        await queryRunner.query(
            `ALTER TABLE "items" DROP CONSTRAINT "FK_0c4aa809ddf5b0c6ca45d8a8e80"`,
        );
        await queryRunner.query(`DROP TABLE "items"`);
        await queryRunner.query(`DROP TABLE "categories"`);
        await queryRunner.query(`DROP TABLE "peaks"`);
        await queryRunner.query(`DROP TABLE "reservations_users"`);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "users" ADD "drivable_date" text array`,
        );
        await queryRunner.query(
            `CREATE TABLE "categories" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "title" character varying NOT NULL, "body" text NOT NULL, "position" integer NOT NULL, "image" character varying NOT NULL, CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`,
        );
        await queryRunner.query(
            `CREATE TABLE "items" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "title" character varying, "price" integer, "zipcode" character varying, "address1" character varying, "address2" character varying, "description" character varying(100), "image" character varying, "status" character varying, "category_id" integer, CONSTRAINT "PK_ba5885359424c15ca6b9e79bcf6" PRIMARY KEY ("id"))`,
        );
        await queryRunner.query(
            `ALTER TABLE "items" ADD CONSTRAINT "FK_0c4aa809ddf5b0c6ca45d8a8e80" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `CREATE TABLE "peaks" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "month" character varying NOT NULL, "peak" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_4ab7385548683b774519559b141" PRIMARY KEY ("id"))`
        );
        await queryRunner.query(
            `CREATE TABLE "reservations_users" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "reservationId" integer, "userId" integer, CONSTRAINT "PK_5a36e072fb302e389707a80f145" PRIMARY KEY ("id"))`,
        );
        await queryRunner.query(
            `ALTER TABLE "reservations_users" ADD CONSTRAINT "FK_930a1cb0cde9abf7a47bfeede94" FOREIGN KEY ("reservationId") REFERENCES "reservations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE "reservations_users" ADD CONSTRAINT "FK_52ecf9f5e4830bb95a921ae9316" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );

    }

}
