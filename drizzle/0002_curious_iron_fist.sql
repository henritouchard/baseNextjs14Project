CREATE TYPE "public"."user_role" AS ENUM('admin', 'operator', 'candidate');--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "role" "user_role";