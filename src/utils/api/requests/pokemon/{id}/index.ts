import type { FetchesRequestConfig } from '@siberiacancode/fetches';

import type { Pokemon } from '@/generated/api/models';

import { pokeApi } from '@/utils/api/instance';

export interface GetPokemonParams {
  id: number | string;
}

export type GetPokemonRequestConfig = FetchesRequestConfig<GetPokemonParams>;

export const getPokemon = ({ config, params }: GetPokemonRequestConfig) =>
  pokeApi.get<Pokemon>(`/pokemon/${params.id}`, config);
