import type { Name, NamedAPIResource } from '../Common';

/**
 * ## Berry
 * Berries are small fruits that can provide HP and status condition restoration,
 * stat enhancement, and even damage negation when eaten by Pokémon.
 *
 * - Check out [Bulbapedia](https://bulbapedia.bulbagarden.net/wiki/Berry) for greater detail
 */
export interface Berry {
  /** The firmness of this berry, used in making Pokéblocks or Poffins */
  firmness: NamedAPIResource;
  /** A list of references to each flavor a berry can have and the potency of each of those flavors in regard to this berry */
  flavors: BerryFlavorMap[];
  /** Time it takes the tree to grow one stage, in hours. Berry trees go through four of these growth stages before they can be picked */
  growth_time: number;
  /** The identifier for this resource */
  id: number;
  /** Berries are actually items. This is a reference to the item specific data for this berry */
  item: NamedAPIResource;
  /** The maximum number of these berries that can grow on one tree in Generation IV */
  max_harvest: number;
  /** The name for this resource */
  name: string;
  /** The power of the move "Natural Gift" when used with this Berry */
  natural_gift_power: number;
  /** The type inherited by "Natural Gift" when used with this Berry */
  natural_gift_type: NamedAPIResource;
  /** The size of this Berry, in millimeters */
  size: number;
  /** The smoothness of this Berry, used in making Pokéblocks or Poffins */
  smoothness: number;
  /** The speed at which this Berry dries out the soil as it grows. A higher rate means the soil dries more quickly */
  soil_dryness: number;
}

/**
 * Reference to the flavor a berry can have and the potency of each of those flavors in regard to this berry
 */
export interface BerryFlavorMap {
  /** The referenced berry flavor */
  flavor: NamedAPIResource;
  /** How powerful the referenced flavor is for this berry */
  potency: number;
}

/**
 * ## Berry Flavor
 * Flavors determine whether a Pokémon will benefit or suffer from eating a berry based on their nature.
 *
 * - Check out [Bulbapedia](https://bulbapedia.bulbagarden.net/wiki/Flavor) for greater detail.
 */
export interface BerryFlavor {
  /** A list of the berries with this flavor */
  berries: FlavorBerryMap[];
  /** The contest type that correlates with this berry flavor */
  contest_type: NamedAPIResource;
  /** The identifier for this resource */
  id: number;
  /** The name for this resource */
  name: 'bitter' | 'dry' | 'sour' | 'spicy' | 'sweet';
  /** The name of this resource listed in different languages */
  names: Name[];
}

/**
 * Berry with the given flavor
 */
export interface FlavorBerryMap {
  /** The berry with the referenced flavor */
  berry: NamedAPIResource;
  /** How powerful the referenced flavor is for this berry */
  potency: number;
}

/**
 * ## Berry Firmness
 * Berries can be soft, very soft, hard, super hard or very hard.
 *
 * - Check out [Bulbapedia](https://bulbapedia.bulbagarden.net/wiki/Category:Berries_by_firmness) for greater detail
 */
export interface BerryFirmness {
  /** A list of the berries with this firmness */
  berries: NamedAPIResource[];
  /** The identifier for this resource */
  id: number;
  /** The name for this resource */
  name: 'hard' | 'soft' | 'super-hard' | 'very-hard' | 'very-soft';
  /** The name of this resource listed in different languages */
  names: Name[];
}
