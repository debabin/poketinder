import type { Encounter } from './encounter';
import type { NamedAPIResource } from './resource';

/**
 * Encounters and their specifics details
 */
export interface VersionEncounterDetail {
  /** A list of encounters and their specifics */
  encounter_details: Encounter[];
  /** The total percentage of all encounter potential */
  max_chance: number;
  /** The game version this encounter happens in */
  version: NamedAPIResource;
}

/**
 * The internal id and version of an API resource
 */
export interface VersionGameIndex {
  /** The internal id of an API resource within game data */
  game_index: number;
  /** The version relevent to this game index */
  version: NamedAPIResource;
}

/**
 * The flavor text of an API resource
 */
export interface VersionGroupFlavorText {
  /** The language this name is in */
  language: NamedAPIResource;
  /** The localized name for an API resource in a specific language */
  text: string;
  /** The version group which uses this flavor text */
  version_group: NamedAPIResource;
}
