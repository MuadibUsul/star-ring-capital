import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_strategic_submissions_status" AS ENUM('new', 'in_review', 'qualified', 'archived');
  CREATE TYPE "public"."enum_strategic_submissions_priority" AS ENUM('high', 'normal', 'low');
  CREATE TYPE "public"."enum_strategic_submissions_locale" AS ENUM('en', 'zh');
  CREATE TABLE "strategic_submissions_entries" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"value" varchar NOT NULL
  );
  
  CREATE TABLE "strategic_submissions" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"status" "enum_strategic_submissions_status" DEFAULT 'new' NOT NULL,
  	"priority" "enum_strategic_submissions_priority" DEFAULT 'normal',
  	"contact_name" varchar NOT NULL,
  	"contact_email" varchar,
  	"organization" varchar,
  	"phone" varchar,
  	"locale" "enum_strategic_submissions_locale" DEFAULT 'en',
  	"source_page" varchar,
  	"message" varchar,
  	"submitted_at" timestamp(3) with time zone NOT NULL,
  	"internal_notes" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "strategic_submissions_id" integer;
  ALTER TABLE "strategic_submissions_entries" ADD CONSTRAINT "strategic_submissions_entries_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."strategic_submissions"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "strategic_submissions_entries_order_idx" ON "strategic_submissions_entries" USING btree ("_order");
  CREATE INDEX "strategic_submissions_entries_parent_id_idx" ON "strategic_submissions_entries" USING btree ("_parent_id");
  CREATE INDEX "strategic_submissions_updated_at_idx" ON "strategic_submissions" USING btree ("updated_at");
  CREATE INDEX "strategic_submissions_created_at_idx" ON "strategic_submissions" USING btree ("created_at");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_strategic_submissions_fk" FOREIGN KEY ("strategic_submissions_id") REFERENCES "public"."strategic_submissions"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_strategic_submissions_id_idx" ON "payload_locked_documents_rels" USING btree ("strategic_submissions_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "strategic_submissions_entries" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "strategic_submissions" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "strategic_submissions_entries" CASCADE;
  DROP TABLE "strategic_submissions" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_strategic_submissions_fk";
  
  DROP INDEX "payload_locked_documents_rels_strategic_submissions_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "strategic_submissions_id";
  DROP TYPE "public"."enum_strategic_submissions_status";
  DROP TYPE "public"."enum_strategic_submissions_priority";
  DROP TYPE "public"."enum_strategic_submissions_locale";`)
}
