import type { FetchesRequestConfig } from '@siberiacancode/fetches';

import type { ItemListParams } from '@/generated/api';
import type { NamedAPIResourceList } from '@/generated/api/models';

import { pokeApi } from '@/utils/api/instance';

export type GetPokemonsParams = {
  limit?: number;
  offset?: number;
};

export type GetPokemonsRequestConfig = FetchesRequestConfig<GetPokemonsParams>;

export const getPokemons = ({ config, params }: GetPokemonsRequestConfig) =>
  pokeApi.get<NamedAPIResourceList>('/pokemon', { params, ...config });
