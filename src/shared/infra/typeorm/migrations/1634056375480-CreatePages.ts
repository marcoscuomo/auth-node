import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreatePages1634056375480 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "PAGE",
        columns: [
          {
            name: "PAGE_ID",
            type: "uuid",
            isPrimary: true
          },
          {
            name: "PAGE_DESCRIPTION",
            type: "varchar"
          },
          {
            name: "PAGE_ACTIVE",
            type: "boolean",
            default: true
          },
          {
            name: "PAGE_DELETED",
            type: "boolean",
            default: false
          },
          {
            name: "PAGE_CREATED_AT",
            type: "timestamp",
            default: "now()"
          },
          {
            name: "PAGE_UPDATED_AT",
            type: "timestamp"
          }
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('PAGE');
  }
}
