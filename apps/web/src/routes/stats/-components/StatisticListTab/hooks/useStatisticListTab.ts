import { useDebounceValue, useField, useIntersectionObserver } from '@siberiacancode/reactuse';
import { getRouteApi } from '@tanstack/react-router';

import { useGetStatisticPokemonsInfiniteQuery } from '@/utils/api/hooks';

const routeApi = getRouteApi('/stats/');

export const useStatisticTab = () => {
  const { offset } = routeApi.useSearch();
  const nameField = useField();
  const name = nameField.watch();
  const debouncedValue = useDebounceValue(name, 500);

  const getPokemonsInfinityQuery = useGetStatisticPokemonsInfiniteQuery(
    { offset, limit: 10, name: debouncedValue },
    {
      options: {
        gcTime: 10_000
      }
    }
  );

  const intersectionObserver = useIntersectionObserver<HTMLDivElement>({
    onChange: () => {
      if (getPokemonsInfinityQuery.isFetchingNextPage) return;
      getPokemonsInfinityQuery.fetchNextPage();
    },
    enabled: getPokemonsInfinityQuery.hasNextPage,
    rootMargin: '300px'
  });

  const onRefreshClick = () => {
    getPokemonsInfinityQuery.refetch();
  };

  const pokemons =
    getPokemonsInfinityQuery.data?.pages?.flatMap((page) => page.data.response.pokemons) ?? [];

  return {
    refs: {
      container: intersectionObserver.ref
    },
    state: {
      isPending: getPokemonsInfinityQuery.isPending,
      isLoadMore: getPokemonsInfinityQuery.isFetchingNextPage,
      isRefreshing: getPokemonsInfinityQuery.isRefetching,
      pokemons,
      nameField
    },
    functions: {
      onRefreshClick
    }
  };
};
