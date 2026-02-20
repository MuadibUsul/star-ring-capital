import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    DO $$
    BEGIN
      IF NOT EXISTS (
        SELECT 1
        FROM pg_type t
        JOIN pg_enum e ON e.enumtypid = t.oid
        WHERE t.typname = 'enum_trajectory_data_periods_period'
          AND e.enumlabel = '3M'
      ) THEN
        ALTER TYPE "public"."enum_trajectory_data_periods_period" ADD VALUE '3M' AFTER '1Y';
      END IF;
    END $$;

    DO $$
    BEGIN
      IF NOT EXISTS (
        SELECT 1
        FROM pg_type t
        JOIN pg_enum e ON e.enumtypid = t.oid
        WHERE t.typname = 'enum__trajectory_data_v_version_periods_period'
          AND e.enumlabel = '3M'
      ) THEN
        ALTER TYPE "public"."enum__trajectory_data_v_version_periods_period" ADD VALUE '3M' AFTER '1Y';
      END IF;
    END $$;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    -- Postgres enum values cannot be dropped safely without type recreation.
    SELECT 1;
  `)
}
