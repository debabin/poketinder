import type { GenerationGameIndex, Name, NamedAPIResource } from '../Common';

/**
 * Details of Pokémon for a specific type.
 */
export interface TypePokemon {
  /** The Pokémon that has the referenced type */
  pokemon: NamedAPIResource;
  /** The order the Pokémon's types are listed in */
  slot: number;
}

/**
 * Detail of how effective a type is toward others and vice versa
 */
export interface TypeRelations {
  /** A list of types that are very effective against this type */
  double_damage_from: NamedAPIResource[];
  /** A list of types this type is very effect against */
  double_damage_to: NamedAPIResource[];
  /** A list of types that are not very effective against this type */
  half_damage_from: NamedAPIResource[];
  /** A list of types this type is not very effect against */
  half_damage_to: NamedAPIResource[];
  /** A list of types that have no effect on this type */
  no_damage_from: NamedAPIResource[];
  /** A list of types this type has no effect on */
  no_damage_to: NamedAPIResource[];
}

/**
 * Details of how effective this type was toward others and vice versa in a previous generation
 */
export interface TypeRelationsPast {
  /** The damage relations the referenced type had up to and including the listed generation */
  damage_relations: TypeRelations;
  /** The last generation in which the referenced type had the listed damage relations */
  generation: NamedAPIResource;
}

/**
 * ## Type
 * Types are properties for Pokémon and their moves.
 * Each type has three properties: which types of Pokémon it is super effective against,
 * which types of Pokémon it is not very effective against, and which types of Pokémon it is completely ineffective against
 */
export interface Type {
  /** A detail of how effective this type is toward others and vice versa */
  damage_relations: TypeRelations;
  /** A list of game indices relevent to this item by generation */
  game_indices: GenerationGameIndex[];
  /** The generation this type was introduced in */
  generation: NamedAPIResource;
  /** The identifier for this resource */
  id: number;
  /** The class of damage inflicted by this type */
  move_damage_class: NamedAPIResource;
  /** A list of moves that have this type */
  moves: NamedAPIResource[];
  /** The name for this resource */
  name: string;
  /** The name of this resource listed in different languages */
  names: Name[];
  /** A list of details of how effective this type was toward others and vice versa in previous generations */
  past_damage_relations: TypeRelationsPast[];
  /** A list of details of Pokémon that have this type */
  pokemon: TypePokemon[];
}
