import type {
  APIResource,
  Description,
  Effect,
  GenerationGameIndex,
  MachineVersionDetail,
  Name,
  NamedAPIResource,
  VerboseEffect,
  VersionGroupFlavorText
} from '../Common';

/**
 * Sprites used to depict the given item in the game
 */
export interface ItemSprites {
  /** The default depiction of this item */
  default: string;
}

/**
 * Pokémon that might be found in the wild holding the given item
 */
export interface ItemHolderPokemon {
  /** The Pokémon that holds this item */
  pokemon: NamedAPIResource;
  /** The details for the version that this item is held in by the Pokémon */
  version_details: ItemHolderPokemonVersionDetail[];
}

/**
 * The details for the version that the given item is held in by the Pokémon
 */
export interface ItemHolderPokemonVersionDetail {
  /** How often this Pokémon holds this item in this version */
  rarity: number;
  /** The version that this item is held in by the Pokémon */
  version: NamedAPIResource;
}

/**
 * ## Item Attribute
 * Item attributes define particular aspects of items, e.g. "usable in battle" or "consumable"
 */
export interface ItemAttribute {
  /** The description of this item attribute listed in different languages */
  descriptions: Description[];
  /** The identifier for this resource */
  id: number;
  /** A list of items that have this attribute */
  items: NamedAPIResource[];
  /** The name for this resource */
  name: string;
  /** The name of this item attribute listed in different languages */
  names: Name[];
}

/**
 * ## Item Category
 * Item categories determine where items will be placed in the players bag
 */
export interface ItemCategory {
  /** The identifier for this resource */
  id: number;
  /** A list of items that are a part of this category */
  items: NamedAPIResource[];
  /** The name for this resource */
  name: string;
  /** The name of this item category listed in different languages */
  names: Name[];
  /** The pocket items in this category would be put in */
  pocket: NamedAPIResource;
}

/**
 * ## Item Fling Effect
 * The various effects of the move "Fling" when used with different items
 */
export interface ItemFlingEffect {
  /** The result of this fling effect listed in different languages */
  effect_entries: Effect[];
  /** The identifier for this resource */
  id: number;
  /** A list of items that have this fling effect */
  items: NamedAPIResource[];
  /** The name for this resource */
  name: string;
}

/**
 * ## Item Pocket
 * Pockets within the players bag used for storing items by category
 */
export interface ItemPocket {
  /** A list of item categories that are relevant to this item pocket */
  categories: NamedAPIResource[];
  /** The identifier for this resource */
  id: number;
  /** The name for this resource */
  name: string;
  /** The name of this resource listed in different languages */
  names: Name[];
}

/**
 * ## Item
 * An item is an object in the games which the player can pick up, keep in their bag, and use in some manner.
 * They have various uses, including healing, powering up, helping catch Pokémon, or to access a new area.
 * - Check out [Bulbapedia](https://bulbapedia.bulbagarden.net/wiki/Item)
 */
export interface Item {
  /** A list of attributes this item has */
  attributes: NamedAPIResource[];
  /** An evolution chain this item requires to produce a bay during mating */
  baby_trigger_for: APIResource | null;
  /** The category of items this item falls into */
  category: NamedAPIResource;
  /** The price of this item in stores */
  cost: number;
  /** The effect of this ability listed in different languages */
  effect_entries: VerboseEffect[];
  /** The flavor text of this ability listed in different languages */
  flavor_text_entries: VersionGroupFlavorText[];
  /** The effect of the move Fling when used with this item */
  fling_effect: NamedAPIResource | null;
  /** The power of the move Fling when used with this item. */
  fling_power: number | null;
  /** A list of game indices relevent to this item by generation */
  game_indices: GenerationGameIndex[];
  /** A list of Pokémon that might be found in the wild holding this item */
  held_by_pokemon: ItemHolderPokemon[];
  /** The identifier for this resource */
  id: number;
  /** A list of the machines related to this item */
  machines: MachineVersionDetail[];
  /** The name for this resource */
  name: string;
  /** The name of this item listed in different languages */
  names: Name[];
  /** A set of sprites used to depict this item in the game */
  sprites: ItemSprites;
}
