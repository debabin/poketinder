import type { NamedAPIResource } from './resource';

/** Information of a pokemon encounter */
export interface Encounter {
  /** Percent chance that this encounter will occur */
  chance: number;
  /** A list of condition values that must be in effect for this encounter to occur */
  condition_values: NamedAPIResource[];
  /** The highest level the Pokémon could be encountered at */
  max_level: number;
  /** The method by which this encounter happens */
  method: NamedAPIResource;
  /** The lowest level the Pokémon could be encountered at */
  min_level: number;
}
