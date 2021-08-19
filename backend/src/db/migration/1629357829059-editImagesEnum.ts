import { MigrationInterface, QueryRunner } from 'typeorm';

export class editImagesEnum1629357829059 implements MigrationInterface {
  name = 'editImagesEnum1629357829059';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "images" ALTER COLUMN "image_type" SET DEFAULT 'main'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "images" ALTER COLUMN "image_type" DROP DEFAULT`,
    );
  }
}
