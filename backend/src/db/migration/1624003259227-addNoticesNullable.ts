import { MigrationInterface, QueryRunner } from 'typeorm';

export class addNoticesNullable1624003259227 implements MigrationInterface {
  name = 'addNoticesNullable1624003259227';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "notices" ALTER COLUMN "entityId" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "notices" ALTER COLUMN "entityType" DROP NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "notices" ALTER COLUMN "entityType" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "notices" ALTER COLUMN "entityId" SET NOT NULL`,
    );
  }
}
