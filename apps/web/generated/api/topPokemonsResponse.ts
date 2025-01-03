/**
 * Generated by orval v7.3.0 🍺
 * Do not edit manually.
 * Poketinder
 * OpenAPI spec version: 1.0
 */
import type { PokemonStatistic } from './pokemonStatistic';

export interface TopPokemonsResponse {
  /** Pokemon */
  pokemons: PokemonStatistic[];
  /**
   * Error reason
   * @nullable
   */
  reason?: string | null;
  /** Request status */
  success: boolean;
}