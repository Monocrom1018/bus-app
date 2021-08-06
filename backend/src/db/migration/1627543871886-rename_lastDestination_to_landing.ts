import {MigrationInterface, QueryRunner} from "typeorm";

export class renameLastDestinationToLanding1627543871886 implements MigrationInterface {
    name = 'renameLastDestinationToLanding1627543871886'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "schedules" RENAME COLUMN "last_destination" TO "landing"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "schedules" RENAME COLUMN "landing" TO "last_destination"`);
    }

}
