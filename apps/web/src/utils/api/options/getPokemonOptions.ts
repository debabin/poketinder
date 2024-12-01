import { queryOptions } from '@tanstack/react-query';

import type { GetPokemonRequestConfig } from '../requests';

import { getPokemon } from '../requests';

export const getPokemonOptions = (requestConfig: GetPokemonRequestConfig) =>
  queryOptions({
    queryKey: ['getPokemon', requestConfig.params.pokemonId],
    queryFn: () => getPokemon(requestConfig)
  });
