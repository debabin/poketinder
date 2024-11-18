import { integer, pgTable } from 'drizzle-orm/pg-core';

export const statisticTable = pgTable('statistic', {
  id: integer('id').primaryKey(),
  pass: integer('pass').default(0).notNull(),
  pokemonId: integer('pokemon_id'),
  smash: integer('smash').default(0).notNull()
});
