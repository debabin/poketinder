import type { Description, NamedAPIResource } from '../Common';

/**
 * Levels and the amount of experienced needed to atain them based on the given growth rate.
 */
export interface GrowthRateExperienceLevel {
  /** The amount of experience required to reach the referenced level. */
  experience: number;
  /** The level gained. */
  level: number;
}

/**
 * ## Growth Rate
 * Growth rates are the speed with which Pokémon gain levels through experience.
 * - Check out [Bulbapedia](https://bulbapedia.bulbagarden.net/wiki/Experience) for greater details.
 */
export interface GrowthRate {
  /** The descriptions of this characteristic listed in different languages */
  descriptions: Description[];
  /** The formula used to calculate the rate at which the Pokémon species gains level */
  formula: string;
  /** The identifier for this resource */
  id: number;
  /** A list of levels and the amount of experienced needed to atain them based on this growth rate. */
  levels: GrowthRateExperienceLevel[];
  /** The name for this resource */
  name: 'fast-then-very-slow' | 'fast' | 'medium-slow' | 'medium' | 'slow-then-very-fast' | 'slow';
  /** A list of Pokémon species that gain levels at this growth rate */
  pokemon_species: NamedAPIResource[];
}
