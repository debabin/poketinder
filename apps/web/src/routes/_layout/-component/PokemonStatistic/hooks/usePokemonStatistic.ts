import { useLocalStorage } from '@siberiacancode/reactuse';
import { keepPreviousData } from '@tanstack/react-query';

import { useGetPokemonQuery, useGetStatisticQuery } from '@/utils/api/hooks';
import { LOCAL_STORAGE_KEYS } from '@/utils/constants';

const REFETCH_STATS_TIME = 5_000;

export const usePokemonStatistic = () => {
  const prevPokemonIdStorage = useLocalStorage<number>(LOCAL_STORAGE_KEYS.PREV_POKEMON_ID);

  const prevPokemonId = !!prevPokemonIdStorage.value;
  const getPokemonQuery = useGetPokemonQuery(
    { pokemonId: prevPokemonIdStorage.value! },
    { options: { enabled: !!prevPokemonId } }
  );

  const getStatisticPokemonQuery = useGetStatisticQuery(
    {
      pokemonId: prevPokemonIdStorage.value!
    },
    {
      options: {
        placeholderData: keepPreviousData,
        refetchInterval: REFETCH_STATS_TIME,
        enabled: !!prevPokemonId
      }
    }
  );

  return {
    state: {
      prevPokemonId,
      statistic: getStatisticPokemonQuery.data?.data.statistic,
      pokemon: getPokemonQuery.data?.data.pokemon,
      loading: getPokemonQuery.isLoading || getStatisticPokemonQuery.isLoading
    }
  };
};
