import { getRouteApi } from '@tanstack/react-router';

import { useGetPokemonsInfiniteQuery } from '@/utils/api/hooks';

const routeApi = getRouteApi('/stats/');

export const useStatsPage = () => {
  const { offset, limit } = routeApi.useSearch();
  const getPokemonsInfinityQuery = useGetPokemonsInfiniteQuery({ offset, limit });

  return {
    state: {
      pages: getPokemonsInfinityQuery.data?.pages ?? []
    }
  };
};
