import type { FetchesRequestConfig } from '@siberiacancode/fetches';

import type { StatisticPokemonResponse } from '@/generated/api';

import { api } from '@/utils/api/instance';

export interface GetStatisticParams {
  pokemonId: number | string;
}

export type GetStatisticRequestConfig = FetchesRequestConfig<GetStatisticParams>;

export const getStatisticPokemon = ({ config, params }: GetStatisticRequestConfig) =>
  api.get<StatisticPokemonResponse>(`statistic/${params.pokemonId}`, config);
