/**
 * Generated by orval v7.3.0 🍺
 * Do not edit manually.
 * Poketinder
 * OpenAPI spec version: 1.0
 */
import type { Pokemon } from './pokemon';

export interface PokemonResponse {
  /** Покемон */
  pokemon: Pokemon;
  /**
   * Причина ошибки
   * @nullable
   */
  reason?: string | null;
  /** Статус запроса */
  success: boolean;
}
