import { useSuspenseQuery } from '@tanstack/react-query';

import type { GetPokemonRequestConfig } from '../requests';

import { getPokemonOptions } from '../options';

export const useGetPokemonSuspenseQuery = (requestConfig: GetPokemonRequestConfig) =>
  useSuspenseQuery(getPokemonOptions(requestConfig));
