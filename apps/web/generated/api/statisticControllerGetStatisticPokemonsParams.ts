/**
 * Generated by orval v7.3.0 🍺
 * Do not edit manually.
 * Poketinder
 * OpenAPI spec version: 1.0
 */
import type { StatisticControllerGetStatisticPokemonsRating } from './statisticControllerGetStatisticPokemonsRating';

export type StatisticControllerGetStatisticPokemonsParams = {
  /**
   * Number of pokemons to return per page
   */
  limit?: number;
  /**
   * Number of pokemons to skip
   */
  offset: number;
  /**
   * Filter pokemons by name
   */
  name?: string;
  /**
   * Filter pokemons by type
   */
  types?: string[];
  /**
   * Filter pokemons by raiting type (smash or pass)
   */
  rating?: StatisticControllerGetStatisticPokemonsRating;
};
