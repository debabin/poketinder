import type { APIResource, Name, NamedAPIResource } from '../Common';

/**
 * ## Stat
 * Stats determine certain aspects of battles. Each Pokémon has a value for each stat
 * which grows as they gain levels and can be altered momentarily by effects in battles
 */
export interface Stat {
  /** A detail of moves which affect this stat positively or negatively */
  affecting_moves: MoveStatAffectSets;
  /** A detail of natures which affect this stat positively or negatively */
  affecting_natures: NatureStatAffectSets;
  /** A list of characteristics that are set on a Pokémon when its highest base stat is this stat */
  characteristics: APIResource[];
  /** ID the games use for this stat */
  game_index: number;
  /** The identifier for this resource */
  id: number;
  /** Whether this stat only exists within a battle */
  is_battle_only: boolean;
  /** The class of damage this stat is directly related to */
  move_damage_class: NamedAPIResource | null;
  /** The name of this resource listed in different languages */
  names: Name[];
  /** The name for this resource */
  name:
    | 'accuracy'
    | 'attack'
    | 'defense'
    | 'evasion'
    | 'hp'
    | 'special-attack'
    | 'special-defense'
    | 'speed';
}

/**
 * A detail of nature which affect the given stat stat positively or negatively
 */
export interface NatureStatAffectSets {
  /** A list of nature sand how they change the referenced stat */
  decrease: NamedAPIResource[];
  /** A list of natures and how they change the referenced stat */
  increase: NamedAPIResource[];
}
/**
 * Move and how it change the referenced stat
 */
export interface MoveStatAffect {
  /** The maximum amount of change to the referenced stat */
  change: -1 | -2 | 1 | 2;
  /** The move causing the change */
  move: NamedAPIResource;
}

/**
 * A detail of moves which affect an stat positively or negatively
 */
export interface MoveStatAffectSets {
  /** A list of moves and how they change the referenced stat */
  decrease: MoveStatAffect[];
  /** A list of moves and how they change the referenced stat */
  increase: MoveStatAffect[];
}
