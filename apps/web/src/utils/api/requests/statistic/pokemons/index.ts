import type { FetchesRequestConfig } from '@siberiacancode/fetches';

import type { StatisticControllerGetPokemonsParams, StatisticPokemonsResponse } from '@/generated/api';

import { api } from '@/utils/api/instance';

export type GetStatisticPokemonsParams = StatisticControllerGetPokemonsParams;

export type GetPokemonsRequestConfig = FetchesRequestConfig<GetStatisticPokemonsParams>;

export const getPokemons = ({ config, params }: GetPokemonsRequestConfig) =>
  api.get<StatisticPokemonsResponse>('statistic/pokemons', { params, ...config });
