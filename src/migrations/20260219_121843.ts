import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_contact_module_form_fields_type" AS ENUM('text', 'email', 'textarea');
  CREATE TYPE "public"."enum_pages_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__pages_v_blocks_contact_module_form_fields_type" AS ENUM('text', 'email', 'textarea');
  CREATE TYPE "public"."enum__pages_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_trajectory_data_periods_period" AS ENUM('3Y', '1Y', 'YTD');
  CREATE TYPE "public"."enum_trajectory_data_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__trajectory_data_v_version_periods_period" AS ENUM('3Y', '1Y', 'YTD');
  CREATE TYPE "public"."enum__trajectory_data_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_engagement_cases_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__engagement_cases_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_research_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__research_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_payload_jobs_log_task_slug" AS ENUM('inline', 'schedulePublish');
  CREATE TYPE "public"."enum_payload_jobs_log_state" AS ENUM('failed', 'succeeded');
  CREATE TYPE "public"."enum_payload_jobs_task_slug" AS ENUM('inline', 'schedulePublish');
  CREATE TYPE "public"."enum_theme_settings_button_style_variant" AS ENUM('rounded', 'outline', 'glow');
  CREATE TYPE "public"."enum_theme_settings_typography_font_preset" AS ENUM('institutional', 'contemporary');
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE "pages_blocks_home_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"brand_name" varchar DEFAULT 'Star Ring Capital',
  	"positioning" varchar DEFAULT 'A private capital structure office focused on stability, risk architecture, and cross-cycle growth.',
  	"primary_c_t_a_label" varchar,
  	"primary_c_t_a_url" varchar,
  	"secondary_c_t_a_label" varchar,
  	"secondary_c_t_a_url" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_core_pillars_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "pages_blocks_core_pillars" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Core Architecture',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_philosophy_statement_modules" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "pages_blocks_philosophy_statement" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"core_sentence" varchar DEFAULT 'Capital is not money. Capital is structured influence.',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_capital_domains_domains" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"line1" varchar,
  	"line2" varchar,
  	"line3" varchar,
  	"read_more_label" varchar,
  	"read_more_url" varchar
  );
  
  CREATE TABLE "pages_blocks_capital_domains" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Capital Domains',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_trajectory_viewer" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Capital Trajectory',
  	"description" varchar DEFAULT 'Trajectory analysis focuses on risk-adjusted consistency, drawdown control, and structural execution quality.',
  	"trajectory_data_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_risk_architecture_layers_bullets" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"item" varchar
  );
  
  CREATE TABLE "pages_blocks_risk_architecture_layers" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"layer_name" varchar,
  	"purpose" varchar
  );
  
  CREATE TABLE "pages_blocks_risk_architecture" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Risk Architecture',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_engagement_narratives" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Strategic Engagement',
  	"description" varchar DEFAULT 'Strategic campaigns are documented by thesis quality, risk posture, and execution discipline. No trade-level disclosure.',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_founder_profile_capability_points" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"point" varchar
  );
  
  CREATE TABLE "pages_blocks_founder_profile" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Founder & Capital Architect',
  	"narrative" varchar,
  	"portrait_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_contact_module_form_fields" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"type" "enum_pages_blocks_contact_module_form_fields_type" DEFAULT 'text',
  	"placeholder" varchar,
  	"required" boolean DEFAULT false
  );
  
  CREATE TABLE "pages_blocks_contact_module" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Contact',
  	"email" varchar,
  	"alignment_copy" varchar DEFAULT 'By strategic alignment only.',
  	"enable_form" boolean DEFAULT true,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"slug" varchar,
  	"navigation_nav_label" varchar,
  	"navigation_show_in_nav" boolean DEFAULT true,
  	"navigation_nav_order" numeric DEFAULT 0,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"seo_og_image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_pages_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "pages_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"engagement_cases_id" integer
  );
  
  CREATE TABLE "_pages_v_blocks_home_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"brand_name" varchar DEFAULT 'Star Ring Capital',
  	"positioning" varchar DEFAULT 'A private capital structure office focused on stability, risk architecture, and cross-cycle growth.',
  	"primary_c_t_a_label" varchar,
  	"primary_c_t_a_url" varchar,
  	"secondary_c_t_a_label" varchar,
  	"secondary_c_t_a_url" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_core_pillars_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_core_pillars" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Core Architecture',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_philosophy_statement_modules" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_philosophy_statement" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"core_sentence" varchar DEFAULT 'Capital is not money. Capital is structured influence.',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_capital_domains_domains" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"line1" varchar,
  	"line2" varchar,
  	"line3" varchar,
  	"read_more_label" varchar,
  	"read_more_url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_capital_domains" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Capital Domains',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_trajectory_viewer" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Capital Trajectory',
  	"description" varchar DEFAULT 'Trajectory analysis focuses on risk-adjusted consistency, drawdown control, and structural execution quality.',
  	"trajectory_data_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_risk_architecture_layers_bullets" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"item" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_risk_architecture_layers" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"layer_name" varchar,
  	"purpose" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_risk_architecture" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Risk Architecture',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_engagement_narratives" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Strategic Engagement',
  	"description" varchar DEFAULT 'Strategic campaigns are documented by thesis quality, risk posture, and execution discipline. No trade-level disclosure.',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_founder_profile_capability_points" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"point" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_founder_profile" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Founder & Capital Architect',
  	"narrative" varchar,
  	"portrait_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_contact_module_form_fields" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"type" "enum__pages_v_blocks_contact_module_form_fields_type" DEFAULT 'text',
  	"placeholder" varchar,
  	"required" boolean DEFAULT false,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_contact_module" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Contact',
  	"email" varchar,
  	"alignment_copy" varchar DEFAULT 'By strategic alignment only.',
  	"enable_form" boolean DEFAULT true,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_slug" varchar,
  	"version_navigation_nav_label" varchar,
  	"version_navigation_show_in_nav" boolean DEFAULT true,
  	"version_navigation_nav_order" numeric DEFAULT 0,
  	"version_seo_title" varchar,
  	"version_seo_description" varchar,
  	"version_seo_og_image_id" integer,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__pages_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_pages_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"engagement_cases_id" integer
  );
  
  CREATE TABLE "trajectory_data_periods_points" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"star_ring_capital" numeric,
  	"global_equity_benchmark" numeric,
  	"risk_free_benchmark" numeric
  );
  
  CREATE TABLE "trajectory_data_periods" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"period" "enum_trajectory_data_periods_period",
  	"metrics_cagr" numeric,
  	"metrics_max_drawdown" numeric,
  	"metrics_volatility" numeric,
  	"metrics_sharpe_ratio" numeric
  );
  
  CREATE TABLE "trajectory_data_compliance_statements" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"statement" varchar
  );
  
  CREATE TABLE "trajectory_data" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"active" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_trajectory_data_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_trajectory_data_v_version_periods_points" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"star_ring_capital" numeric,
  	"global_equity_benchmark" numeric,
  	"risk_free_benchmark" numeric,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_trajectory_data_v_version_periods" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"period" "enum__trajectory_data_v_version_periods_period",
  	"metrics_cagr" numeric,
  	"metrics_max_drawdown" numeric,
  	"metrics_volatility" numeric,
  	"metrics_sharpe_ratio" numeric,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_trajectory_data_v_version_compliance_statements" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"statement" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_trajectory_data_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_active" boolean DEFAULT true,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__trajectory_data_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "engagement_cases_summary_lines" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"line" varchar
  );
  
  CREATE TABLE "engagement_cases" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"year" numeric,
  	"strategic_name" varchar,
  	"result_signature" varchar DEFAULT 'Stability-first execution with controlled drawdown profile.',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_engagement_cases_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_engagement_cases_v_version_summary_lines" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"line" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_engagement_cases_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_year" numeric,
  	"version_strategic_name" varchar,
  	"version_result_signature" varchar DEFAULT 'Stability-first execution with controlled drawdown profile.',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__engagement_cases_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "research" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"slug" varchar,
  	"excerpt" varchar,
  	"body" varchar,
  	"show_on_site" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_research_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_research_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_slug" varchar,
  	"version_excerpt" varchar,
  	"version_body" varchar,
  	"version_show_on_site" boolean DEFAULT false,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__research_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_jobs_log" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"executed_at" timestamp(3) with time zone NOT NULL,
  	"completed_at" timestamp(3) with time zone NOT NULL,
  	"task_slug" "enum_payload_jobs_log_task_slug" NOT NULL,
  	"task_i_d" varchar NOT NULL,
  	"input" jsonb,
  	"output" jsonb,
  	"state" "enum_payload_jobs_log_state" NOT NULL,
  	"error" jsonb
  );
  
  CREATE TABLE "payload_jobs" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"input" jsonb,
  	"completed_at" timestamp(3) with time zone,
  	"total_tried" numeric DEFAULT 0,
  	"has_error" boolean DEFAULT false,
  	"error" jsonb,
  	"task_slug" "enum_payload_jobs_task_slug",
  	"queue" varchar DEFAULT 'default',
  	"wait_until" timestamp(3) with time zone,
  	"processing" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer,
  	"media_id" integer,
  	"pages_id" integer,
  	"trajectory_data_id" integer,
  	"engagement_cases_id" integer,
  	"research_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "site_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"site_name" varchar DEFAULT 'Star Ring Capital' NOT NULL,
  	"tagline" varchar DEFAULT 'Private Capital Structure Office' NOT NULL,
  	"primary_nav_c_t_a_label" varchar DEFAULT 'Strategic Collaboration',
  	"primary_nav_c_t_a_url" varchar DEFAULT '/contact',
  	"default_s_e_o_title" varchar DEFAULT 'Star Ring Capital | Structured Influence in Capital',
  	"default_s_e_o_description" varchar DEFAULT 'Star Ring Capital is a private capital structure office focused on risk architecture, cross-cycle allocation, and stability-first growth.',
  	"default_s_e_o_og_image_id" integer,
  	"footer_note" varchar DEFAULT 'Structured influence. Stable growth. Disciplined risk architecture.' NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "theme_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"background_color" varchar DEFAULT '#07090f' NOT NULL,
  	"background_accent_color" varchar DEFAULT '#0d1422' NOT NULL,
  	"text_color" varchar DEFAULT '#f5f4ef' NOT NULL,
  	"muted_text_color" varchar DEFAULT '#b7b19e' NOT NULL,
  	"accent_gold_color" varchar DEFAULT '#d5b36a' NOT NULL,
  	"button_style_variant" "enum_theme_settings_button_style_variant" DEFAULT 'outline' NOT NULL,
  	"button_style_radius" numeric DEFAULT 999 NOT NULL,
  	"button_style_glow_intensity" numeric DEFAULT 0.28 NOT NULL,
  	"typography_font_preset" "enum_theme_settings_typography_font_preset" DEFAULT 'institutional' NOT NULL,
  	"typography_body_weight" numeric DEFAULT 400 NOT NULL,
  	"typography_heading_weight" numeric DEFAULT 600 NOT NULL,
  	"logo_id" integer,
  	"orbit_effect_enabled" boolean DEFAULT true,
  	"orbit_effect_speed" numeric DEFAULT 26 NOT NULL,
  	"orbit_effect_opacity" numeric DEFAULT 0.32 NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_home_hero" ADD CONSTRAINT "pages_blocks_home_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_core_pillars_cards" ADD CONSTRAINT "pages_blocks_core_pillars_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_core_pillars"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_core_pillars" ADD CONSTRAINT "pages_blocks_core_pillars_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_philosophy_statement_modules" ADD CONSTRAINT "pages_blocks_philosophy_statement_modules_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_philosophy_statement"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_philosophy_statement" ADD CONSTRAINT "pages_blocks_philosophy_statement_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_capital_domains_domains" ADD CONSTRAINT "pages_blocks_capital_domains_domains_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_capital_domains"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_capital_domains" ADD CONSTRAINT "pages_blocks_capital_domains_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_trajectory_viewer" ADD CONSTRAINT "pages_blocks_trajectory_viewer_trajectory_data_id_trajectory_data_id_fk" FOREIGN KEY ("trajectory_data_id") REFERENCES "public"."trajectory_data"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_trajectory_viewer" ADD CONSTRAINT "pages_blocks_trajectory_viewer_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_risk_architecture_layers_bullets" ADD CONSTRAINT "pages_blocks_risk_architecture_layers_bullets_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_risk_architecture_layers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_risk_architecture_layers" ADD CONSTRAINT "pages_blocks_risk_architecture_layers_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_risk_architecture"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_risk_architecture" ADD CONSTRAINT "pages_blocks_risk_architecture_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_engagement_narratives" ADD CONSTRAINT "pages_blocks_engagement_narratives_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_founder_profile_capability_points" ADD CONSTRAINT "pages_blocks_founder_profile_capability_points_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_founder_profile"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_founder_profile" ADD CONSTRAINT "pages_blocks_founder_profile_portrait_id_media_id_fk" FOREIGN KEY ("portrait_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_founder_profile" ADD CONSTRAINT "pages_blocks_founder_profile_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact_module_form_fields" ADD CONSTRAINT "pages_blocks_contact_module_form_fields_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_contact_module"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact_module" ADD CONSTRAINT "pages_blocks_contact_module_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_engagement_cases_fk" FOREIGN KEY ("engagement_cases_id") REFERENCES "public"."engagement_cases"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_home_hero" ADD CONSTRAINT "_pages_v_blocks_home_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_core_pillars_cards" ADD CONSTRAINT "_pages_v_blocks_core_pillars_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_core_pillars"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_core_pillars" ADD CONSTRAINT "_pages_v_blocks_core_pillars_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_philosophy_statement_modules" ADD CONSTRAINT "_pages_v_blocks_philosophy_statement_modules_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_philosophy_statement"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_philosophy_statement" ADD CONSTRAINT "_pages_v_blocks_philosophy_statement_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_capital_domains_domains" ADD CONSTRAINT "_pages_v_blocks_capital_domains_domains_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_capital_domains"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_capital_domains" ADD CONSTRAINT "_pages_v_blocks_capital_domains_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_trajectory_viewer" ADD CONSTRAINT "_pages_v_blocks_trajectory_viewer_trajectory_data_id_trajectory_data_id_fk" FOREIGN KEY ("trajectory_data_id") REFERENCES "public"."trajectory_data"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_trajectory_viewer" ADD CONSTRAINT "_pages_v_blocks_trajectory_viewer_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_risk_architecture_layers_bullets" ADD CONSTRAINT "_pages_v_blocks_risk_architecture_layers_bullets_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_risk_architecture_layers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_risk_architecture_layers" ADD CONSTRAINT "_pages_v_blocks_risk_architecture_layers_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_risk_architecture"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_risk_architecture" ADD CONSTRAINT "_pages_v_blocks_risk_architecture_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_engagement_narratives" ADD CONSTRAINT "_pages_v_blocks_engagement_narratives_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_founder_profile_capability_points" ADD CONSTRAINT "_pages_v_blocks_founder_profile_capability_points_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_founder_profile"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_founder_profile" ADD CONSTRAINT "_pages_v_blocks_founder_profile_portrait_id_media_id_fk" FOREIGN KEY ("portrait_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_founder_profile" ADD CONSTRAINT "_pages_v_blocks_founder_profile_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_contact_module_form_fields" ADD CONSTRAINT "_pages_v_blocks_contact_module_form_fields_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_contact_module"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_contact_module" ADD CONSTRAINT "_pages_v_blocks_contact_module_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_parent_id_pages_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_seo_og_image_id_media_id_fk" FOREIGN KEY ("version_seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_engagement_cases_fk" FOREIGN KEY ("engagement_cases_id") REFERENCES "public"."engagement_cases"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "trajectory_data_periods_points" ADD CONSTRAINT "trajectory_data_periods_points_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."trajectory_data_periods"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "trajectory_data_periods" ADD CONSTRAINT "trajectory_data_periods_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."trajectory_data"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "trajectory_data_compliance_statements" ADD CONSTRAINT "trajectory_data_compliance_statements_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."trajectory_data"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_trajectory_data_v_version_periods_points" ADD CONSTRAINT "_trajectory_data_v_version_periods_points_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_trajectory_data_v_version_periods"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_trajectory_data_v_version_periods" ADD CONSTRAINT "_trajectory_data_v_version_periods_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_trajectory_data_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_trajectory_data_v_version_compliance_statements" ADD CONSTRAINT "_trajectory_data_v_version_compliance_statements_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_trajectory_data_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_trajectory_data_v" ADD CONSTRAINT "_trajectory_data_v_parent_id_trajectory_data_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."trajectory_data"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "engagement_cases_summary_lines" ADD CONSTRAINT "engagement_cases_summary_lines_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."engagement_cases"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_engagement_cases_v_version_summary_lines" ADD CONSTRAINT "_engagement_cases_v_version_summary_lines_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_engagement_cases_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_engagement_cases_v" ADD CONSTRAINT "_engagement_cases_v_parent_id_engagement_cases_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."engagement_cases"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_research_v" ADD CONSTRAINT "_research_v_parent_id_research_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."research"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_jobs_log" ADD CONSTRAINT "payload_jobs_log_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."payload_jobs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_trajectory_data_fk" FOREIGN KEY ("trajectory_data_id") REFERENCES "public"."trajectory_data"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_engagement_cases_fk" FOREIGN KEY ("engagement_cases_id") REFERENCES "public"."engagement_cases"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_research_fk" FOREIGN KEY ("research_id") REFERENCES "public"."research"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_default_s_e_o_og_image_id_media_id_fk" FOREIGN KEY ("default_s_e_o_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "theme_settings" ADD CONSTRAINT "theme_settings_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "pages_blocks_home_hero_order_idx" ON "pages_blocks_home_hero" USING btree ("_order");
  CREATE INDEX "pages_blocks_home_hero_parent_id_idx" ON "pages_blocks_home_hero" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_home_hero_path_idx" ON "pages_blocks_home_hero" USING btree ("_path");
  CREATE INDEX "pages_blocks_core_pillars_cards_order_idx" ON "pages_blocks_core_pillars_cards" USING btree ("_order");
  CREATE INDEX "pages_blocks_core_pillars_cards_parent_id_idx" ON "pages_blocks_core_pillars_cards" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_core_pillars_order_idx" ON "pages_blocks_core_pillars" USING btree ("_order");
  CREATE INDEX "pages_blocks_core_pillars_parent_id_idx" ON "pages_blocks_core_pillars" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_core_pillars_path_idx" ON "pages_blocks_core_pillars" USING btree ("_path");
  CREATE INDEX "pages_blocks_philosophy_statement_modules_order_idx" ON "pages_blocks_philosophy_statement_modules" USING btree ("_order");
  CREATE INDEX "pages_blocks_philosophy_statement_modules_parent_id_idx" ON "pages_blocks_philosophy_statement_modules" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_philosophy_statement_order_idx" ON "pages_blocks_philosophy_statement" USING btree ("_order");
  CREATE INDEX "pages_blocks_philosophy_statement_parent_id_idx" ON "pages_blocks_philosophy_statement" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_philosophy_statement_path_idx" ON "pages_blocks_philosophy_statement" USING btree ("_path");
  CREATE INDEX "pages_blocks_capital_domains_domains_order_idx" ON "pages_blocks_capital_domains_domains" USING btree ("_order");
  CREATE INDEX "pages_blocks_capital_domains_domains_parent_id_idx" ON "pages_blocks_capital_domains_domains" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_capital_domains_order_idx" ON "pages_blocks_capital_domains" USING btree ("_order");
  CREATE INDEX "pages_blocks_capital_domains_parent_id_idx" ON "pages_blocks_capital_domains" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_capital_domains_path_idx" ON "pages_blocks_capital_domains" USING btree ("_path");
  CREATE INDEX "pages_blocks_trajectory_viewer_order_idx" ON "pages_blocks_trajectory_viewer" USING btree ("_order");
  CREATE INDEX "pages_blocks_trajectory_viewer_parent_id_idx" ON "pages_blocks_trajectory_viewer" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_trajectory_viewer_path_idx" ON "pages_blocks_trajectory_viewer" USING btree ("_path");
  CREATE INDEX "pages_blocks_trajectory_viewer_trajectory_data_idx" ON "pages_blocks_trajectory_viewer" USING btree ("trajectory_data_id");
  CREATE INDEX "pages_blocks_risk_architecture_layers_bullets_order_idx" ON "pages_blocks_risk_architecture_layers_bullets" USING btree ("_order");
  CREATE INDEX "pages_blocks_risk_architecture_layers_bullets_parent_id_idx" ON "pages_blocks_risk_architecture_layers_bullets" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_risk_architecture_layers_order_idx" ON "pages_blocks_risk_architecture_layers" USING btree ("_order");
  CREATE INDEX "pages_blocks_risk_architecture_layers_parent_id_idx" ON "pages_blocks_risk_architecture_layers" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_risk_architecture_order_idx" ON "pages_blocks_risk_architecture" USING btree ("_order");
  CREATE INDEX "pages_blocks_risk_architecture_parent_id_idx" ON "pages_blocks_risk_architecture" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_risk_architecture_path_idx" ON "pages_blocks_risk_architecture" USING btree ("_path");
  CREATE INDEX "pages_blocks_engagement_narratives_order_idx" ON "pages_blocks_engagement_narratives" USING btree ("_order");
  CREATE INDEX "pages_blocks_engagement_narratives_parent_id_idx" ON "pages_blocks_engagement_narratives" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_engagement_narratives_path_idx" ON "pages_blocks_engagement_narratives" USING btree ("_path");
  CREATE INDEX "pages_blocks_founder_profile_capability_points_order_idx" ON "pages_blocks_founder_profile_capability_points" USING btree ("_order");
  CREATE INDEX "pages_blocks_founder_profile_capability_points_parent_id_idx" ON "pages_blocks_founder_profile_capability_points" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_founder_profile_order_idx" ON "pages_blocks_founder_profile" USING btree ("_order");
  CREATE INDEX "pages_blocks_founder_profile_parent_id_idx" ON "pages_blocks_founder_profile" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_founder_profile_path_idx" ON "pages_blocks_founder_profile" USING btree ("_path");
  CREATE INDEX "pages_blocks_founder_profile_portrait_idx" ON "pages_blocks_founder_profile" USING btree ("portrait_id");
  CREATE INDEX "pages_blocks_contact_module_form_fields_order_idx" ON "pages_blocks_contact_module_form_fields" USING btree ("_order");
  CREATE INDEX "pages_blocks_contact_module_form_fields_parent_id_idx" ON "pages_blocks_contact_module_form_fields" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_contact_module_order_idx" ON "pages_blocks_contact_module" USING btree ("_order");
  CREATE INDEX "pages_blocks_contact_module_parent_id_idx" ON "pages_blocks_contact_module" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_contact_module_path_idx" ON "pages_blocks_contact_module" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_slug_idx" ON "pages" USING btree ("slug");
  CREATE INDEX "pages_seo_seo_og_image_idx" ON "pages" USING btree ("seo_og_image_id");
  CREATE INDEX "pages_updated_at_idx" ON "pages" USING btree ("updated_at");
  CREATE INDEX "pages_created_at_idx" ON "pages" USING btree ("created_at");
  CREATE INDEX "pages__status_idx" ON "pages" USING btree ("_status");
  CREATE INDEX "pages_rels_order_idx" ON "pages_rels" USING btree ("order");
  CREATE INDEX "pages_rels_parent_idx" ON "pages_rels" USING btree ("parent_id");
  CREATE INDEX "pages_rels_path_idx" ON "pages_rels" USING btree ("path");
  CREATE INDEX "pages_rels_engagement_cases_id_idx" ON "pages_rels" USING btree ("engagement_cases_id");
  CREATE INDEX "_pages_v_blocks_home_hero_order_idx" ON "_pages_v_blocks_home_hero" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_home_hero_parent_id_idx" ON "_pages_v_blocks_home_hero" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_home_hero_path_idx" ON "_pages_v_blocks_home_hero" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_core_pillars_cards_order_idx" ON "_pages_v_blocks_core_pillars_cards" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_core_pillars_cards_parent_id_idx" ON "_pages_v_blocks_core_pillars_cards" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_core_pillars_order_idx" ON "_pages_v_blocks_core_pillars" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_core_pillars_parent_id_idx" ON "_pages_v_blocks_core_pillars" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_core_pillars_path_idx" ON "_pages_v_blocks_core_pillars" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_philosophy_statement_modules_order_idx" ON "_pages_v_blocks_philosophy_statement_modules" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_philosophy_statement_modules_parent_id_idx" ON "_pages_v_blocks_philosophy_statement_modules" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_philosophy_statement_order_idx" ON "_pages_v_blocks_philosophy_statement" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_philosophy_statement_parent_id_idx" ON "_pages_v_blocks_philosophy_statement" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_philosophy_statement_path_idx" ON "_pages_v_blocks_philosophy_statement" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_capital_domains_domains_order_idx" ON "_pages_v_blocks_capital_domains_domains" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_capital_domains_domains_parent_id_idx" ON "_pages_v_blocks_capital_domains_domains" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_capital_domains_order_idx" ON "_pages_v_blocks_capital_domains" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_capital_domains_parent_id_idx" ON "_pages_v_blocks_capital_domains" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_capital_domains_path_idx" ON "_pages_v_blocks_capital_domains" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_trajectory_viewer_order_idx" ON "_pages_v_blocks_trajectory_viewer" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_trajectory_viewer_parent_id_idx" ON "_pages_v_blocks_trajectory_viewer" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_trajectory_viewer_path_idx" ON "_pages_v_blocks_trajectory_viewer" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_trajectory_viewer_trajectory_data_idx" ON "_pages_v_blocks_trajectory_viewer" USING btree ("trajectory_data_id");
  CREATE INDEX "_pages_v_blocks_risk_architecture_layers_bullets_order_idx" ON "_pages_v_blocks_risk_architecture_layers_bullets" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_risk_architecture_layers_bullets_parent_id_idx" ON "_pages_v_blocks_risk_architecture_layers_bullets" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_risk_architecture_layers_order_idx" ON "_pages_v_blocks_risk_architecture_layers" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_risk_architecture_layers_parent_id_idx" ON "_pages_v_blocks_risk_architecture_layers" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_risk_architecture_order_idx" ON "_pages_v_blocks_risk_architecture" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_risk_architecture_parent_id_idx" ON "_pages_v_blocks_risk_architecture" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_risk_architecture_path_idx" ON "_pages_v_blocks_risk_architecture" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_engagement_narratives_order_idx" ON "_pages_v_blocks_engagement_narratives" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_engagement_narratives_parent_id_idx" ON "_pages_v_blocks_engagement_narratives" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_engagement_narratives_path_idx" ON "_pages_v_blocks_engagement_narratives" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_founder_profile_capability_points_order_idx" ON "_pages_v_blocks_founder_profile_capability_points" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_founder_profile_capability_points_parent_id_idx" ON "_pages_v_blocks_founder_profile_capability_points" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_founder_profile_order_idx" ON "_pages_v_blocks_founder_profile" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_founder_profile_parent_id_idx" ON "_pages_v_blocks_founder_profile" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_founder_profile_path_idx" ON "_pages_v_blocks_founder_profile" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_founder_profile_portrait_idx" ON "_pages_v_blocks_founder_profile" USING btree ("portrait_id");
  CREATE INDEX "_pages_v_blocks_contact_module_form_fields_order_idx" ON "_pages_v_blocks_contact_module_form_fields" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_contact_module_form_fields_parent_id_idx" ON "_pages_v_blocks_contact_module_form_fields" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_contact_module_order_idx" ON "_pages_v_blocks_contact_module" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_contact_module_parent_id_idx" ON "_pages_v_blocks_contact_module" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_contact_module_path_idx" ON "_pages_v_blocks_contact_module" USING btree ("_path");
  CREATE INDEX "_pages_v_parent_idx" ON "_pages_v" USING btree ("parent_id");
  CREATE INDEX "_pages_v_version_version_slug_idx" ON "_pages_v" USING btree ("version_slug");
  CREATE INDEX "_pages_v_version_seo_version_seo_og_image_idx" ON "_pages_v" USING btree ("version_seo_og_image_id");
  CREATE INDEX "_pages_v_version_version_updated_at_idx" ON "_pages_v" USING btree ("version_updated_at");
  CREATE INDEX "_pages_v_version_version_created_at_idx" ON "_pages_v" USING btree ("version_created_at");
  CREATE INDEX "_pages_v_version_version__status_idx" ON "_pages_v" USING btree ("version__status");
  CREATE INDEX "_pages_v_created_at_idx" ON "_pages_v" USING btree ("created_at");
  CREATE INDEX "_pages_v_updated_at_idx" ON "_pages_v" USING btree ("updated_at");
  CREATE INDEX "_pages_v_latest_idx" ON "_pages_v" USING btree ("latest");
  CREATE INDEX "_pages_v_autosave_idx" ON "_pages_v" USING btree ("autosave");
  CREATE INDEX "_pages_v_rels_order_idx" ON "_pages_v_rels" USING btree ("order");
  CREATE INDEX "_pages_v_rels_parent_idx" ON "_pages_v_rels" USING btree ("parent_id");
  CREATE INDEX "_pages_v_rels_path_idx" ON "_pages_v_rels" USING btree ("path");
  CREATE INDEX "_pages_v_rels_engagement_cases_id_idx" ON "_pages_v_rels" USING btree ("engagement_cases_id");
  CREATE INDEX "trajectory_data_periods_points_order_idx" ON "trajectory_data_periods_points" USING btree ("_order");
  CREATE INDEX "trajectory_data_periods_points_parent_id_idx" ON "trajectory_data_periods_points" USING btree ("_parent_id");
  CREATE INDEX "trajectory_data_periods_order_idx" ON "trajectory_data_periods" USING btree ("_order");
  CREATE INDEX "trajectory_data_periods_parent_id_idx" ON "trajectory_data_periods" USING btree ("_parent_id");
  CREATE INDEX "trajectory_data_compliance_statements_order_idx" ON "trajectory_data_compliance_statements" USING btree ("_order");
  CREATE INDEX "trajectory_data_compliance_statements_parent_id_idx" ON "trajectory_data_compliance_statements" USING btree ("_parent_id");
  CREATE INDEX "trajectory_data_updated_at_idx" ON "trajectory_data" USING btree ("updated_at");
  CREATE INDEX "trajectory_data_created_at_idx" ON "trajectory_data" USING btree ("created_at");
  CREATE INDEX "trajectory_data__status_idx" ON "trajectory_data" USING btree ("_status");
  CREATE INDEX "_trajectory_data_v_version_periods_points_order_idx" ON "_trajectory_data_v_version_periods_points" USING btree ("_order");
  CREATE INDEX "_trajectory_data_v_version_periods_points_parent_id_idx" ON "_trajectory_data_v_version_periods_points" USING btree ("_parent_id");
  CREATE INDEX "_trajectory_data_v_version_periods_order_idx" ON "_trajectory_data_v_version_periods" USING btree ("_order");
  CREATE INDEX "_trajectory_data_v_version_periods_parent_id_idx" ON "_trajectory_data_v_version_periods" USING btree ("_parent_id");
  CREATE INDEX "_trajectory_data_v_version_compliance_statements_order_idx" ON "_trajectory_data_v_version_compliance_statements" USING btree ("_order");
  CREATE INDEX "_trajectory_data_v_version_compliance_statements_parent_id_idx" ON "_trajectory_data_v_version_compliance_statements" USING btree ("_parent_id");
  CREATE INDEX "_trajectory_data_v_parent_idx" ON "_trajectory_data_v" USING btree ("parent_id");
  CREATE INDEX "_trajectory_data_v_version_version_updated_at_idx" ON "_trajectory_data_v" USING btree ("version_updated_at");
  CREATE INDEX "_trajectory_data_v_version_version_created_at_idx" ON "_trajectory_data_v" USING btree ("version_created_at");
  CREATE INDEX "_trajectory_data_v_version_version__status_idx" ON "_trajectory_data_v" USING btree ("version__status");
  CREATE INDEX "_trajectory_data_v_created_at_idx" ON "_trajectory_data_v" USING btree ("created_at");
  CREATE INDEX "_trajectory_data_v_updated_at_idx" ON "_trajectory_data_v" USING btree ("updated_at");
  CREATE INDEX "_trajectory_data_v_latest_idx" ON "_trajectory_data_v" USING btree ("latest");
  CREATE INDEX "_trajectory_data_v_autosave_idx" ON "_trajectory_data_v" USING btree ("autosave");
  CREATE INDEX "engagement_cases_summary_lines_order_idx" ON "engagement_cases_summary_lines" USING btree ("_order");
  CREATE INDEX "engagement_cases_summary_lines_parent_id_idx" ON "engagement_cases_summary_lines" USING btree ("_parent_id");
  CREATE INDEX "engagement_cases_updated_at_idx" ON "engagement_cases" USING btree ("updated_at");
  CREATE INDEX "engagement_cases_created_at_idx" ON "engagement_cases" USING btree ("created_at");
  CREATE INDEX "engagement_cases__status_idx" ON "engagement_cases" USING btree ("_status");
  CREATE INDEX "_engagement_cases_v_version_summary_lines_order_idx" ON "_engagement_cases_v_version_summary_lines" USING btree ("_order");
  CREATE INDEX "_engagement_cases_v_version_summary_lines_parent_id_idx" ON "_engagement_cases_v_version_summary_lines" USING btree ("_parent_id");
  CREATE INDEX "_engagement_cases_v_parent_idx" ON "_engagement_cases_v" USING btree ("parent_id");
  CREATE INDEX "_engagement_cases_v_version_version_updated_at_idx" ON "_engagement_cases_v" USING btree ("version_updated_at");
  CREATE INDEX "_engagement_cases_v_version_version_created_at_idx" ON "_engagement_cases_v" USING btree ("version_created_at");
  CREATE INDEX "_engagement_cases_v_version_version__status_idx" ON "_engagement_cases_v" USING btree ("version__status");
  CREATE INDEX "_engagement_cases_v_created_at_idx" ON "_engagement_cases_v" USING btree ("created_at");
  CREATE INDEX "_engagement_cases_v_updated_at_idx" ON "_engagement_cases_v" USING btree ("updated_at");
  CREATE INDEX "_engagement_cases_v_latest_idx" ON "_engagement_cases_v" USING btree ("latest");
  CREATE INDEX "_engagement_cases_v_autosave_idx" ON "_engagement_cases_v" USING btree ("autosave");
  CREATE UNIQUE INDEX "research_slug_idx" ON "research" USING btree ("slug");
  CREATE INDEX "research_updated_at_idx" ON "research" USING btree ("updated_at");
  CREATE INDEX "research_created_at_idx" ON "research" USING btree ("created_at");
  CREATE INDEX "research__status_idx" ON "research" USING btree ("_status");
  CREATE INDEX "_research_v_parent_idx" ON "_research_v" USING btree ("parent_id");
  CREATE INDEX "_research_v_version_version_slug_idx" ON "_research_v" USING btree ("version_slug");
  CREATE INDEX "_research_v_version_version_updated_at_idx" ON "_research_v" USING btree ("version_updated_at");
  CREATE INDEX "_research_v_version_version_created_at_idx" ON "_research_v" USING btree ("version_created_at");
  CREATE INDEX "_research_v_version_version__status_idx" ON "_research_v" USING btree ("version__status");
  CREATE INDEX "_research_v_created_at_idx" ON "_research_v" USING btree ("created_at");
  CREATE INDEX "_research_v_updated_at_idx" ON "_research_v" USING btree ("updated_at");
  CREATE INDEX "_research_v_latest_idx" ON "_research_v" USING btree ("latest");
  CREATE INDEX "_research_v_autosave_idx" ON "_research_v" USING btree ("autosave");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_jobs_log_order_idx" ON "payload_jobs_log" USING btree ("_order");
  CREATE INDEX "payload_jobs_log_parent_id_idx" ON "payload_jobs_log" USING btree ("_parent_id");
  CREATE INDEX "payload_jobs_completed_at_idx" ON "payload_jobs" USING btree ("completed_at");
  CREATE INDEX "payload_jobs_total_tried_idx" ON "payload_jobs" USING btree ("total_tried");
  CREATE INDEX "payload_jobs_has_error_idx" ON "payload_jobs" USING btree ("has_error");
  CREATE INDEX "payload_jobs_task_slug_idx" ON "payload_jobs" USING btree ("task_slug");
  CREATE INDEX "payload_jobs_queue_idx" ON "payload_jobs" USING btree ("queue");
  CREATE INDEX "payload_jobs_wait_until_idx" ON "payload_jobs" USING btree ("wait_until");
  CREATE INDEX "payload_jobs_processing_idx" ON "payload_jobs" USING btree ("processing");
  CREATE INDEX "payload_jobs_updated_at_idx" ON "payload_jobs" USING btree ("updated_at");
  CREATE INDEX "payload_jobs_created_at_idx" ON "payload_jobs" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("pages_id");
  CREATE INDEX "payload_locked_documents_rels_trajectory_data_id_idx" ON "payload_locked_documents_rels" USING btree ("trajectory_data_id");
  CREATE INDEX "payload_locked_documents_rels_engagement_cases_id_idx" ON "payload_locked_documents_rels" USING btree ("engagement_cases_id");
  CREATE INDEX "payload_locked_documents_rels_research_id_idx" ON "payload_locked_documents_rels" USING btree ("research_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "site_settings_default_s_e_o_default_s_e_o_og_image_idx" ON "site_settings" USING btree ("default_s_e_o_og_image_id");
  CREATE INDEX "theme_settings_logo_idx" ON "theme_settings" USING btree ("logo_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "pages_blocks_home_hero" CASCADE;
  DROP TABLE "pages_blocks_core_pillars_cards" CASCADE;
  DROP TABLE "pages_blocks_core_pillars" CASCADE;
  DROP TABLE "pages_blocks_philosophy_statement_modules" CASCADE;
  DROP TABLE "pages_blocks_philosophy_statement" CASCADE;
  DROP TABLE "pages_blocks_capital_domains_domains" CASCADE;
  DROP TABLE "pages_blocks_capital_domains" CASCADE;
  DROP TABLE "pages_blocks_trajectory_viewer" CASCADE;
  DROP TABLE "pages_blocks_risk_architecture_layers_bullets" CASCADE;
  DROP TABLE "pages_blocks_risk_architecture_layers" CASCADE;
  DROP TABLE "pages_blocks_risk_architecture" CASCADE;
  DROP TABLE "pages_blocks_engagement_narratives" CASCADE;
  DROP TABLE "pages_blocks_founder_profile_capability_points" CASCADE;
  DROP TABLE "pages_blocks_founder_profile" CASCADE;
  DROP TABLE "pages_blocks_contact_module_form_fields" CASCADE;
  DROP TABLE "pages_blocks_contact_module" CASCADE;
  DROP TABLE "pages" CASCADE;
  DROP TABLE "pages_rels" CASCADE;
  DROP TABLE "_pages_v_blocks_home_hero" CASCADE;
  DROP TABLE "_pages_v_blocks_core_pillars_cards" CASCADE;
  DROP TABLE "_pages_v_blocks_core_pillars" CASCADE;
  DROP TABLE "_pages_v_blocks_philosophy_statement_modules" CASCADE;
  DROP TABLE "_pages_v_blocks_philosophy_statement" CASCADE;
  DROP TABLE "_pages_v_blocks_capital_domains_domains" CASCADE;
  DROP TABLE "_pages_v_blocks_capital_domains" CASCADE;
  DROP TABLE "_pages_v_blocks_trajectory_viewer" CASCADE;
  DROP TABLE "_pages_v_blocks_risk_architecture_layers_bullets" CASCADE;
  DROP TABLE "_pages_v_blocks_risk_architecture_layers" CASCADE;
  DROP TABLE "_pages_v_blocks_risk_architecture" CASCADE;
  DROP TABLE "_pages_v_blocks_engagement_narratives" CASCADE;
  DROP TABLE "_pages_v_blocks_founder_profile_capability_points" CASCADE;
  DROP TABLE "_pages_v_blocks_founder_profile" CASCADE;
  DROP TABLE "_pages_v_blocks_contact_module_form_fields" CASCADE;
  DROP TABLE "_pages_v_blocks_contact_module" CASCADE;
  DROP TABLE "_pages_v" CASCADE;
  DROP TABLE "_pages_v_rels" CASCADE;
  DROP TABLE "trajectory_data_periods_points" CASCADE;
  DROP TABLE "trajectory_data_periods" CASCADE;
  DROP TABLE "trajectory_data_compliance_statements" CASCADE;
  DROP TABLE "trajectory_data" CASCADE;
  DROP TABLE "_trajectory_data_v_version_periods_points" CASCADE;
  DROP TABLE "_trajectory_data_v_version_periods" CASCADE;
  DROP TABLE "_trajectory_data_v_version_compliance_statements" CASCADE;
  DROP TABLE "_trajectory_data_v" CASCADE;
  DROP TABLE "engagement_cases_summary_lines" CASCADE;
  DROP TABLE "engagement_cases" CASCADE;
  DROP TABLE "_engagement_cases_v_version_summary_lines" CASCADE;
  DROP TABLE "_engagement_cases_v" CASCADE;
  DROP TABLE "research" CASCADE;
  DROP TABLE "_research_v" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_jobs_log" CASCADE;
  DROP TABLE "payload_jobs" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "site_settings" CASCADE;
  DROP TABLE "theme_settings" CASCADE;
  DROP TYPE "public"."enum_pages_blocks_contact_module_form_fields_type";
  DROP TYPE "public"."enum_pages_status";
  DROP TYPE "public"."enum__pages_v_blocks_contact_module_form_fields_type";
  DROP TYPE "public"."enum__pages_v_version_status";
  DROP TYPE "public"."enum_trajectory_data_periods_period";
  DROP TYPE "public"."enum_trajectory_data_status";
  DROP TYPE "public"."enum__trajectory_data_v_version_periods_period";
  DROP TYPE "public"."enum__trajectory_data_v_version_status";
  DROP TYPE "public"."enum_engagement_cases_status";
  DROP TYPE "public"."enum__engagement_cases_v_version_status";
  DROP TYPE "public"."enum_research_status";
  DROP TYPE "public"."enum__research_v_version_status";
  DROP TYPE "public"."enum_payload_jobs_log_task_slug";
  DROP TYPE "public"."enum_payload_jobs_log_state";
  DROP TYPE "public"."enum_payload_jobs_task_slug";
  DROP TYPE "public"."enum_theme_settings_button_style_variant";
  DROP TYPE "public"."enum_theme_settings_typography_font_preset";`)
}
