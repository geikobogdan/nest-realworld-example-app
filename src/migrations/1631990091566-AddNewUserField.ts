import {MigrationInterface, QueryRunner} from "typeorm";

export class AddNewUserField1631990091566 implements MigrationInterface {
    name = 'AddNewUserField1631990091566'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."users" ADD "username" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."users" DROP COLUMN "username"`);
    }

}
