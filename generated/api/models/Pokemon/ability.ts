import type { Effect, Name, NamedAPIResource, VerboseEffect } from '../Common';

/**
 * ## Ability
 * Abilities provide passive effects for Pokémon in battle or in the overworld.
 * Pokémon have multiple possible abilities but can have only one ability at a time.
 * - Check out [Bulbapedia](https://bulbapedia.bulbagarden.net/wiki/Ability) for greater detail.
 */
export interface Ability {
  /** The list of previous effects this ability has had across version groups */
  effect_changes: AbilityEffectChange[];
  /** The effect of this ability listed in different languages */
  effect_entries: VerboseEffect[];
  /** The flavor text of this ability listed in different languages */
  flavor_text_entries: AbilityFlavorText[];
  /** The generation this ability originated in */
  generation: NamedAPIResource;
  /** The identifier for this resource */
  id: number;
  /** Whether or not this ability originated in the main series of the video games */
  is_main_series: boolean;
  /** The name for this resource */
  name: string;
  /** The name of this resource listed in different languages */
  names: Name[];
  /** A list of Pokémon that could potentially have this ability */
  pokemon: AbilityPokemon[];
}

/**
 * Previous effects an ability has had across version groups
 */
export interface AbilityEffectChange {
  /** The previous effect of this ability listed in different languages */
  effect_entries: Effect[];
  /** The version group in which the previous effect of this ability originated */
  version_group: NamedAPIResource;
}

/**
 * The flavor text of an ability
 */
export interface AbilityFlavorText {
  /** The localized name for an API resource in a specific language */
  flavor_text: string;
  /** The language this text resource is in */
  language: NamedAPIResource;
  /** The version group that uses this flavor text */
  version_group: NamedAPIResource;
}

/**
 * Pokémon that could potentially have the given ability
 */
export interface AbilityPokemon {
  /** Whether or not this a hidden ability for the referenced Pokémon */
  is_hidden: boolean;
  /** The Pokémon this ability could belong to */
  pokemon: NamedAPIResource;
  /**
   * Pokémon have 3 ability 'slots' which hold references to possible abilities they could have.
   * This is the slot of this ability for the referenced pokemon
   */
  slot: number;
}
