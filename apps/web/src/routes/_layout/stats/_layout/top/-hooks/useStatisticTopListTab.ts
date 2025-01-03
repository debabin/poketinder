import { keepPreviousData } from '@tanstack/react-query';

import { useGetStatisticTopQuery } from '@/utils/api/hooks';

import { POKEMON_TOP } from '../-constants';

const STATISTIC_TOP_REFETCH_INTERVAL = 10_000;

export const useStatisticTopListTab = () => {
  const getStatisticTopQuery = useGetStatisticTopQuery(
    {
      count: POKEMON_TOP.PLACES
    },
    {
      options: {
        refetchInterval: STATISTIC_TOP_REFETCH_INTERVAL,
        placeholderData: keepPreviousData
      }
    }
  );

  const pokemons = getStatisticTopQuery.data?.data.pokemons ?? [];
  const winnerPokemons = pokemons.slice(0, POKEMON_TOP.WINNER);
  const otherPokemons = pokemons.slice(POKEMON_TOP.WINNER, pokemons.length);

  return {
    state: {
      isFetching: getStatisticTopQuery.isFetching,
      isLoading: getStatisticTopQuery.isLoading,
      isRefreshing: getStatisticTopQuery.isRefetching,
      winnerPokemons,
      otherPokemons
    }
  };
};
