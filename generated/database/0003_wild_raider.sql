ALTER TABLE "pokemon" ADD COLUMN "pokemon_id" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "pokemon" ADD COLUMN "type" text[] DEFAULT '{}' NOT NULL;