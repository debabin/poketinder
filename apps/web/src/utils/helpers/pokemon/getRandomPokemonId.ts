import { MAX_POKEMON_COUNTS } from '@/utils/constants';

export const getRandomPokemonId = () => Math.round(Math.random() * MAX_POKEMON_COUNTS) || 1;
