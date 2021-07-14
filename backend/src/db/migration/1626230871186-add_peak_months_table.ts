import { MigrationInterface, QueryRunner } from 'typeorm';

export class addPeakMonthsTable1626230871186 implements MigrationInterface {
  name = 'addPeakMonthsTable1626230871186';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "peaks" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "month" character varying NOT NULL, "peak" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_4ab7385548683b774519559b141" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "peaks"`);
  }
}
