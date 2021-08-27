import { MigrationInterface, QueryRunner } from 'typeorm';

export class addChatrooms1629887232558 implements MigrationInterface {
  name = 'addChatrooms1629887232558';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users_chatrooms" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "id" SERIAL NOT NULL, "chatroomId" integer, "userId" integer, CONSTRAINT "PK_c0cbc11fa78b4f3c3287674d743" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "chatrooms_chat_room_type_enum" AS ENUM('single', 'multi')`,
    );
    await queryRunner.query(
      `CREATE TABLE "chatrooms" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "id" SERIAL NOT NULL, "name" character varying, "avatar" character varying, "chat_room_type" "chatrooms_chat_room_type_enum" NOT NULL DEFAULT 'single', CONSTRAINT "PK_d190d6f785fb99dffb138cd0443" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_chatrooms" ADD CONSTRAINT "FK_2740f8750808e9eb6b48aee3c05" FOREIGN KEY ("chatroomId") REFERENCES "chatrooms"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_chatrooms" ADD CONSTRAINT "FK_229c669b4bb2639fe3ae89bd30e" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users_chatrooms" DROP CONSTRAINT "FK_229c669b4bb2639fe3ae89bd30e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_chatrooms" DROP CONSTRAINT "FK_2740f8750808e9eb6b48aee3c05"`,
    );
    await queryRunner.query(`DROP TABLE "chatrooms"`);
    await queryRunner.query(`DROP TYPE "chatrooms_chat_room_type_enum"`);
    await queryRunner.query(`DROP TABLE "users_chatrooms"`);
  }
}
