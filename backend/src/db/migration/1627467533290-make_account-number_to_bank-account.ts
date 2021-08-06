import {MigrationInterface, QueryRunner} from "typeorm";

export class makeAccountNumberToBankAccount1627467533290 implements MigrationInterface {
    name = 'makeAccountNumberToBankAccount1627467533290'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "account_number" TO "bank_account"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "bank_account" TO "account_number"`);
    }

}
