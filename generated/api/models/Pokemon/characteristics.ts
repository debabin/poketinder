import type { Description, NamedAPIResource } from '../Common';

/**
 * ## Characteristic
 * Characteristics indicate which stat contains a Pokémon's highest IV.
 * A Pokémon's Characteristic is determined by the remainder of its highest IV divided by 5 (gene_modulo).
 * - Check out [Bulbapedia](https://bulbapedia.bulbagarden.net/wiki/Characteristic) for greater detail
 */
export interface Characteristic {
  /** Descriptions for the referenced characteristic */
  descriptions: Description[];
  /** The remainder of the highest stat/IV divided by 5 */
  gene_modulo: number;
  /** The highest stat for the referenced characteristic */
  highest_stat: NamedAPIResource;
  /** The identifier for this resource */
  id: number;
  /** The possible values of the highest stat that would result in a Pokémon recieving this characteristic when divided by 5 */
  possible_values: number[];
}
