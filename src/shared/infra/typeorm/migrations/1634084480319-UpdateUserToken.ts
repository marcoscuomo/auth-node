import {MigrationInterface, QueryRunner, TableColumn, Timestamp} from "typeorm";

export class UpdateUserToken1634084480319 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('USER', new TableColumn({
            name: "USER_TOKEN_EXPIRES",
            type: "timestamp",
            isNullable: true,
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('USER', 'USER_TOKEN_EXPIRES');
    }

}
