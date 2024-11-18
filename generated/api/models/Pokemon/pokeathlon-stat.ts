import type { Name, NamedAPIResource } from '../Common';

/**
 * ## Pokeathlon Stat
 * Pokeathlon Stats are different attributes of a Pokémon's performance in Pokéathlons.
 * In Pokéathlons, competitions happen on different courses; one for each of the different Pokéathlon stats.
 * - See [Bulbapedia](https://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9athlon) for greater details.
 */
export interface PokeathlonStat {
  /** A detail of natures which affect this Pokéathlon stat positively or negatively */
  affecting_natures: NaturePokeathlonStatAffectSets;
  /** The identifier for this resource */
  id: number;
  /** The name for this resource */
  name: 'jump' | 'power' | 'skill' | 'speed' | 'stamina';
  /** The name of this resource listed in different languages */
  names: Name[];
}

/**
 * A nature and how it change the referenced Pokéathlon stat
 */
export interface NaturePokeathlonStatAffect {
  /** The maximum amount of change to the referenced Pokéathlon stat. */
  max_change: -1 | -2 | 1 | 2;
  /** The nature causing the change */
  nature: NamedAPIResource;
}

/**
 * A detail of natures which affect this Pokéathlon stat positively or negatively
 */
export interface NaturePokeathlonStatAffectSets {
  /** A list of natures and how they change the referenced Pokéathlon stat */
  decrease: NaturePokeathlonStatAffect[];
  /** A list of natures and how they change the referenced Pokéathlon stat */
  increase: NaturePokeathlonStatAffect[];
}
