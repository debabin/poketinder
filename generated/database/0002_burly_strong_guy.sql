CREATE TABLE IF NOT EXISTS "pokemon" (
	"description" text NOT NULL,
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"image" text NOT NULL,
	"name" text NOT NULL,
	CONSTRAINT "pokemon_image_unique" UNIQUE("image"),
	CONSTRAINT "pokemon_name_unique" UNIQUE("name")
);
