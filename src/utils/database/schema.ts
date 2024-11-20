import { integer, pgTable, text, uuid } from 'drizzle-orm/pg-core';

export const statisticTable = pgTable('statistic', {
  id: uuid('id').defaultRandom().primaryKey(),
  pass: integer('pass').default(0).notNull(),
  pokemonId: integer('pokemon_id').notNull(),
  smash: integer('smash').default(0).notNull()
});

export const pokemonTable = pgTable('pokemon', {
  id: uuid('id').defaultRandom().primaryKey(),
  pokemonId: integer('pokemon_id').notNull(),
  image: text('image').unique().notNull(),
  name: text('name').unique().notNull(),
  description: text('description').notNull(),
  types: text('types').array().default([]).notNull()
});

export type Pokemon = typeof pokemonTable.$inferSelect;
export type Statistic = typeof statisticTable.$inferSelect;