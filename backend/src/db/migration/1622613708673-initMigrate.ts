import { MigrationInterface, QueryRunner } from 'typeorm';

export class initMigrate1622613708673 implements MigrationInterface {
  name = 'initMigrate1622613708673';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "admin_users" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "PK_06744d221bb6145dc61e5dc441d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "items" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "title" character varying, "price" integer, "zipcode" character varying, "address1" character varying, "address2" character varying, "description" character varying(100), "image" character varying, "status" character varying, "category_id" integer, CONSTRAINT "PK_ba5885359424c15ca6b9e79bcf6" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "categories" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "title" character varying NOT NULL, "body" text NOT NULL, "position" integer NOT NULL, "image" character varying NOT NULL, CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "faqs" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "question" character varying NOT NULL, "answer" character varying NOT NULL, CONSTRAINT "PK_2ddf4f2c910f8e8fa2663a67bf0" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "rooms" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "status" character varying NOT NULL, CONSTRAINT "PK_0368a2d7c215f2d0458a54933f2" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "reservations" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "departure" character varying NOT NULL, "departureDate" TIMESTAMP NOT NULL, "stopover" character varying, "destination" character varying NOT NULL, "returnDate" TIMESTAMP NOT NULL, "people" integer NOT NULL, "accompany" character varying NOT NULL, "price" integer NOT NULL, "status" character varying NOT NULL, CONSTRAINT "PK_da95cef71b617ac35dc5bcda243" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "reservations_users" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "reservationId" integer, "userId" integer, CONSTRAINT "PK_5a36e072fb302e389707a80f145" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "users_user_type_enum" AS ENUM('normal', 'driver', 'company')`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "email" character varying NOT NULL, "password" character varying, "password_confirmation" character varying, "encrypted_password" character varying NOT NULL, "name" character varying(100) NOT NULL, "profile_img" character varying, "zipcode" character varying, "address1" character varying, "address2" character varying, "phone" character varying, "user_type" "users_user_type_enum" NOT NULL DEFAULT 'normal', CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "messages" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "content" character varying NOT NULL, "userId" integer, "roomId" integer, CONSTRAINT "PK_18325f38ae6de43878487eff986" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "notices" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "title" character varying NOT NULL, "body" character varying NOT NULL, CONSTRAINT "PK_3eb18c29da25d6935fcbe584237" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "rooms_users" ("room" integer NOT NULL, "user" integer NOT NULL, CONSTRAINT "PK_4360e76adcd27e174d2672490e5" PRIMARY KEY ("room", "user"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_f5c348c8baaeaf17b1d053a659" ON "rooms_users" ("room") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_43f8a0fc4287775dffd11c1d07" ON "rooms_users" ("user") `,
    );
    await queryRunner.query(
      `ALTER TABLE "items" ADD CONSTRAINT "FK_0c4aa809ddf5b0c6ca45d8a8e80" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "reservations_users" ADD CONSTRAINT "FK_930a1cb0cde9abf7a47bfeede94" FOREIGN KEY ("reservationId") REFERENCES "reservations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "reservations_users" ADD CONSTRAINT "FK_52ecf9f5e4830bb95a921ae9316" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "messages" ADD CONSTRAINT "FK_4838cd4fc48a6ff2d4aa01aa646" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "messages" ADD CONSTRAINT "FK_aaa8a6effc7bd20a1172d3a3bc8" FOREIGN KEY ("roomId") REFERENCES "rooms"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "rooms_users" ADD CONSTRAINT "FK_f5c348c8baaeaf17b1d053a6597" FOREIGN KEY ("room") REFERENCES "rooms"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "rooms_users" ADD CONSTRAINT "FK_43f8a0fc4287775dffd11c1d07e" FOREIGN KEY ("user") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "rooms_users" DROP CONSTRAINT "FK_43f8a0fc4287775dffd11c1d07e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "rooms_users" DROP CONSTRAINT "FK_f5c348c8baaeaf17b1d053a6597"`,
    );
    await queryRunner.query(
      `ALTER TABLE "messages" DROP CONSTRAINT "FK_aaa8a6effc7bd20a1172d3a3bc8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "messages" DROP CONSTRAINT "FK_4838cd4fc48a6ff2d4aa01aa646"`,
    );
    await queryRunner.query(
      `ALTER TABLE "reservations_users" DROP CONSTRAINT "FK_52ecf9f5e4830bb95a921ae9316"`,
    );
    await queryRunner.query(
      `ALTER TABLE "reservations_users" DROP CONSTRAINT "FK_930a1cb0cde9abf7a47bfeede94"`,
    );
    await queryRunner.query(
      `ALTER TABLE "items" DROP CONSTRAINT "FK_0c4aa809ddf5b0c6ca45d8a8e80"`,
    );
    await queryRunner.query(`DROP INDEX "IDX_43f8a0fc4287775dffd11c1d07"`);
    await queryRunner.query(`DROP INDEX "IDX_f5c348c8baaeaf17b1d053a659"`);
    await queryRunner.query(`DROP TABLE "rooms_users"`);
    await queryRunner.query(`DROP TABLE "notices"`);
    await queryRunner.query(`DROP TABLE "messages"`);
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TYPE "users_user_type_enum"`);
    await queryRunner.query(`DROP TABLE "reservations_users"`);
    await queryRunner.query(`DROP TABLE "reservations"`);
    await queryRunner.query(`DROP TABLE "rooms"`);
    await queryRunner.query(`DROP TABLE "faqs"`);
    await queryRunner.query(`DROP TABLE "categories"`);
    await queryRunner.query(`DROP TABLE "items"`);
    await queryRunner.query(`DROP TABLE "admin_users"`);
  }
}
