const BACKGROUND_MAP = {
  bug: ['forest'],
  dark: ['city'],
  dragon: ['space'],
  electric: ['thunderplains'],
  fairy: ['space'],
  fighting: ['city', 'meadow'],
  fire: ['volcanocave', 'desert'],
  flying: ['mountain', 'route'],
  ghost: ['earthycave'],
  grass: ['meadow'],
  ground: ['mountain', 'earthycave', 'route'],
  ice: ['icecave'],
  normal: ['route', 'city'],
  poison: ['earthycave'],
  psychic: ['city', 'spl'],
  rock: ['mountain', 'earthycave'],
  steel: ['mountain'],
  water: ['beach', 'beachshore', 'river', 'deepsea']
};

export const getPokemonBackground = (type: string) =>
  BACKGROUND_MAP[type][Math.floor(Math.random() * BACKGROUND_MAP[type].length)];
