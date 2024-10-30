ALTER TABLE "users" RENAME COLUMN "name" TO "firstname";--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "role" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "lastname" varchar(30);