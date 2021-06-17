import { MigrationInterface, QueryRunner } from 'typeorm';

export class addNoticePolymorphic1623919525541 implements MigrationInterface {
  name = 'addNoticePolymorphic1623919525541';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "rooms_users" DROP CONSTRAINT "FK_f5c348c8baaeaf17b1d053a6597"`,
    );
    await queryRunner.query(
      `ALTER TABLE "rooms_users" DROP CONSTRAINT "FK_43f8a0fc4287775dffd11c1d07e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "notices" ADD "entityId" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "notices" ADD "entityType" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "rooms_users" ADD CONSTRAINT "FK_f5c348c8baaeaf17b1d053a6597" FOREIGN KEY ("room") REFERENCES "rooms"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "rooms_users" ADD CONSTRAINT "FK_43f8a0fc4287775dffd11c1d07e" FOREIGN KEY ("user") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "rooms_users" DROP CONSTRAINT "FK_43f8a0fc4287775dffd11c1d07e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "rooms_users" DROP CONSTRAINT "FK_f5c348c8baaeaf17b1d053a6597"`,
    );
    await queryRunner.query(`ALTER TABLE "notices" DROP COLUMN "entityType"`);
    await queryRunner.query(`ALTER TABLE "notices" DROP COLUMN "entityId"`);
    await queryRunner.query(
      `ALTER TABLE "rooms_users" ADD CONSTRAINT "FK_43f8a0fc4287775dffd11c1d07e" FOREIGN KEY ("user") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "rooms_users" ADD CONSTRAINT "FK_f5c348c8baaeaf17b1d053a6597" FOREIGN KEY ("room") REFERENCES "rooms"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }
}
