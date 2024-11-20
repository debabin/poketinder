ALTER TABLE "statistic" ALTER COLUMN "id" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "statistic" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();--> statement-breakpoint
ALTER TABLE "statistic" ALTER COLUMN "pokemon_id" SET NOT NULL;