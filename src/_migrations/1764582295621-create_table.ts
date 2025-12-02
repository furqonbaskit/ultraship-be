import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTable1764582295621 implements MigrationInterface {
  name = 'CreateTable1764582295621';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "ultraship"."attendance" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdBy" uuid, "updatedBy" uuid, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "recorded_at" TIMESTAMP WITH TIME ZONE NOT NULL, "status" character varying NOT NULL, "notes" text, "user_id" uuid NOT NULL, CONSTRAINT "PK_ee0ffe42c1f1a01e72b725c0cb2" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "ultraship"."users" ADD "class" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "ultraship"."users" ADD "subject" text`,
    );
    await queryRunner.query(
      `ALTER TABLE "ultraship"."attendance" ADD CONSTRAINT "FK_0bedbcc8d5f9b9ec4979f519597" FOREIGN KEY ("user_id") REFERENCES "ultraship"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "ultraship"."attendance" DROP CONSTRAINT "FK_0bedbcc8d5f9b9ec4979f519597"`,
    );
    await queryRunner.query(
      `ALTER TABLE "ultraship"."users" DROP COLUMN "subject"`,
    );
    await queryRunner.query(
      `ALTER TABLE "ultraship"."users" DROP COLUMN "class"`,
    );
    await queryRunner.query(`DROP TABLE "ultraship"."attendance"`);
  }
}
