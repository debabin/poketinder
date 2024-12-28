// import { getRouteApi } from '@tanstack/react-router';
import { keepPreviousData } from '@tanstack/react-query';

import { useGetStatisticTopQuery } from '@/utils/api/hooks';

import { POKEMONS_REQUESTS_PAGINATION } from '../../../-constants';

// const routeApi = getRouteApi('/_layout/stats/');

const STATISTIC_TOP_REFETCH_INTERVAL = 10_000;

export const useStatisticTopListTab = () => {
  const getStatisticTopQuery = useGetStatisticTopQuery(
    {
      count: POKEMONS_REQUESTS_PAGINATION.LIMIT
    },
    {
      options: {
        refetchInterval: STATISTIC_TOP_REFETCH_INTERVAL,
        placeholderData: keepPreviousData
      }
    }
  );

  const pokemons = getStatisticTopQuery.data?.data.pokemons ?? [];
  const winnerPokemons = pokemons.slice(0, 3);
  const otherPokemons = pokemons.slice(3, pokemons.length);

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
