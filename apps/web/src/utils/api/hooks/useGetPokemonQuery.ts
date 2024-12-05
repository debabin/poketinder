import { useQuery } from '@tanstack/react-query';

import type { GetPokemonParams } from '../requests';

import { getPokemon } from '../requests';

export const useGetPokemonQuery = (
  params: GetPokemonParams,
  settings?: QuerySettings<typeof getPokemon>
) =>
  useQuery({
    queryKey: ['getPokemon', params.pokemonId],
    queryFn: () => getPokemon({ params, config: settings?.config }),
    ...settings?.options
  });
