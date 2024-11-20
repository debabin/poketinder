import type { FetchesRequestConfig } from '@siberiacancode/fetches';

import type { PokemonSpecies } from '@/generated/api/models';

import { pokeApi } from '@/utils/api/instance';

export interface GetPokemonSpeciesParams {
    id: number | string;
}

export type GetPokemonSpeciesRequestConfig = FetchesRequestConfig<GetPokemonSpeciesParams>;

export const getPokemonSpecies = ({ config, params }: GetPokemonSpeciesRequestConfig) =>
    pokeApi.get<PokemonSpecies>(`/pokemon-species/${params.id}`, config);
