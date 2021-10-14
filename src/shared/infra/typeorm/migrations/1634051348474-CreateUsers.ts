import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateUsers1634051348474 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table(
          {
            name: "USER",
            columns: [
              {
                name: "USER_ID",
                type: "uuid",
                isPrimary: true
              },
              {
                name: "USER_NAME",
                type: "varchar"
              },
              {
                name: "USER_EMAIL",
                type: "varchar"
              },
              {
                name: "USER_PASSWORD",
                type: "varchar"
              },
              {
                name: "USER_TOKEN",
                type: "varchar",
                default: null
              },
              {
                name: "USER_ACTIVE",
                type: "boolean",
                default: true
              },
              {
                name: "USER_DELETED",
                type: "boolean",
                default: false
              },
              {
                name: "USER_CREATED_AT",
                type: "timestamp",
                default: "now()"
              },
              {
                name: "USER_UPDATED_AT",
                type: "timestamp",
                default: null
              }
            ]
          }
          )
      );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('USER');
    }

}
