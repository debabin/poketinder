import type { FetchesRequestConfig } from '@siberiacancode/fetches';

import type { NamedAPIResourceList } from '@/generated/api/models';

import { pokeApi } from '@/utils/api/instance';

export interface GetPokemonsParams {
  limit?: number;
  offset?: number;
}

export type GetPokemonsRequestConfig = FetchesRequestConfig<GetPokemonsParams>;

export const getPokemons = ({ config, params }: GetPokemonsRequestConfig) =>
  pokeApi.get<NamedAPIResourceList>('/pokemon', { params, ...config });
