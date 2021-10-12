import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateProfile1634055887116 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table(
          {
            name: "PROFILE",
            columns: [
              {
                name: "PROF_ID",
                type: "uuid",
                isPrimary: true
              },
              {
                name: "PROF_DESCRIPTION",
                type: "varchar"
              },
              {
                name: "PROF_ACTIVE",
                type: "boolean",
                default: true
              },
              {
                name: "PROF_DELETED",
                type: "boolean",
                default: false
              },
              {
                name: "PROF_CREATED_AT",
                type: "timestamp",
                default: "now()"
              },
              {
                name: "PROF_UPDATED_AT",
                type: "timestamp"
              }
            ]
          }
        )
      );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('PROFILE');
    }

}
