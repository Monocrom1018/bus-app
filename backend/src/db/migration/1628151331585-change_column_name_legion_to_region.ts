import {MigrationInterface, QueryRunner} from "typeorm";

export class changeColumnNameLegionToRegion1628151331585 implements MigrationInterface {
    name = 'changeColumnNameLegionToRegion1628151331585'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "drivable_legion" TO "drivable_region"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "drivable_region" TO "drivable_legion"`);
    }

}
