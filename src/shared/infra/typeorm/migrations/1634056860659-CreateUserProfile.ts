import { Column, MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUserProfile1634056860659 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "USER_PROFILE",
        columns: [
          {
            name: "USPR_ID",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "USPR_USER_ID",
            type: "uuid",
          },
          {
            name: "USPR_PROF_ID",
            type: "uuid",
          },
          {
            name: "USPR_ACTIVE",
            type: "boolean",
            default: true,
          },
          {
            name: "USPR_DELETED",
            type: "boolean",
            default: false
          },
          {
            name: "USPR_CREATED_AT",
            type: "timestamp",
            default: "now()"
          },
          {
            name: "USPR_UPDATED_AT",
            type: "timestamp"
          }
        ],
        foreignKeys: [
          {
            name: "FK_USER_ID",
            referencedTableName: "USER",
            referencedColumnNames: ["USER_ID"],
            columnNames: ["USPR_USER_ID"],
            onDelete: "SET NULL",
            onUpdate: "SET NULL"
          },
          {
            name: "FK_PROFILE_ID",
            referencedTableName: "PROFILE",
            referencedColumnNames: ["PROF_ID"],
            columnNames: ["USPR_PROF_ID"],
            onDelete: "SET NULL",
            onUpdate: "SET NULL"
          }
        ]
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('USER_PROFILE');
  }
}
