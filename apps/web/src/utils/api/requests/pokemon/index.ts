import type { FetchesRequestConfig } from '@siberiacancode/fetches';

import type { PokemonControllerGetPokemonsParams, PokemonsResponse } from '@/generated/api';

import { api } from '@/utils/api/instance';

export type GetPokemonsParams = PokemonControllerGetPokemonsParams;

export type GetPokemonsRequestConfig = FetchesRequestConfig<GetPokemonsParams>;

export const getPokemons = ({ config, params }: GetPokemonsRequestConfig) =>
  api.get<PokemonsResponse>('pokemon', { params, ...config });
