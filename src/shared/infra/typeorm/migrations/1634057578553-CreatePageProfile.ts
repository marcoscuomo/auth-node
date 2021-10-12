import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreatePageProfile1634057578553 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table(
        {
          name: "PAGE_PROFILE",
          columns: [
            {
              name: "PAPR_ID",
              type: "uuid",
              isPrimary: true
            },
            {
              name: "PAPR_PAGE_ID",
              type: "uuid"
            },
            {
              name: "PAPR_PROF_ID",
              type: "uuid"
            },
            {
              name: "PAPR_ACTIVE",
              type: "boolean",
              default: true
            },
            {
              name: "PAPR_DELETED",
              type: "boolean",
              default: false
            },
            {
              name: "PAPR_CREATED_AT",
              type: "timestamp",
              default: "now()"
            },
            {
              name: "UPAPR_UPDATED_AT",
              type: "timestamp"
            }
          ],
          foreignKeys: [
            {
              name: "FK_PAGE",
              referencedTableName: "PAGE",
              referencedColumnNames: ["PAGE_ID"],
              columnNames: ["PAPR_PAGE_ID"],
              onDelete: "SET NULL",
              onUpdate: "SET NULL"
            },
            {
              name: "FK_PROFILE",
              referencedTableName: "PROFILE",
              referencedColumnNames: ["PROF_ID"],
              columnNames: ["PAPR_PROF_ID"],
              onDelete: "SET NULL",
              onUpdate: "SET NULL"
            }
          ]
        }
      )
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('PAGE_PROFILE');
  }

}
