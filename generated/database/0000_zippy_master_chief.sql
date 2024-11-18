CREATE TABLE IF NOT EXISTS "statistic" (
	"id" integer PRIMARY KEY NOT NULL,
	"pokemon_id" integer,
	"smash" integer DEFAULT 0 NOT NULL,
	"pass" integer DEFAULT 0 NOT NULL
);
