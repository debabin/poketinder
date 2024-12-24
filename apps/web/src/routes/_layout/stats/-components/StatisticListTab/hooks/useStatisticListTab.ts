import {
  useDebounceValue,
  useDidUpdate,
  useField,
  useIntersectionObserver
} from '@siberiacancode/reactuse';
// import { getRouteApi } from '@tanstack/react-router';
import { keepPreviousData } from '@tanstack/react-query';

import { useGetStatisticPokemonsInfiniteQuery } from '@/utils/api/hooks';

import { POKEMONS_REQUESTS_PAGINATION } from '../../../-constants';

// const routeApi = getRouteApi('/_layout/stats/');

export const useStatisticTab = () => {
  // const { offset, limit } = routeApi.useSearch();
  const nameField = useField();
  const name = nameField.watch();
  const debouncedValue = useDebounceValue(name, 500);

  const getPokemonsInfinityQuery = useGetStatisticPokemonsInfiniteQuery(
    {
      offset: POKEMONS_REQUESTS_PAGINATION.OFFSET,
      limit: POKEMONS_REQUESTS_PAGINATION.LIMIT,
      ...(debouncedValue && { name: debouncedValue })
    },
    {
      options: {
        gcTime: 10_000,
        placeholderData: keepPreviousData
      }
    }
  );

  const intersectionObserver = useIntersectionObserver<HTMLDivElement>({
    threshold: 0.5,
    rootMargin: '300px'
  });

  useDidUpdate(() => {
    if (getPokemonsInfinityQuery.isFetchingNextPage) return;
    getPokemonsInfinityQuery.fetchNextPage();
  }, [intersectionObserver.inView]);

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
      isFetching: getPokemonsInfinityQuery.isFetching,
      isLoading: getPokemonsInfinityQuery.isLoading,
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
