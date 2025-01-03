import {
  useDebounceValue,
  useDidUpdate,
  useField,
  useIntersectionObserver
} from '@siberiacancode/reactuse';
import { keepPreviousData } from '@tanstack/react-query';
import { getRouteApi } from '@tanstack/react-router';
import { useState } from 'react';

import { useGetStatisticPokemonsInfiniteQuery } from '@/utils/api/hooks';

import { POKEMONS_REQUESTS_PAGINATION } from '../../../-constants';

const routeApi = getRouteApi('/_layout/stats/_layout/list/');

export const useStatisticListTab = () => {
  const navigate = routeApi.useNavigate();
  const searchParams = routeApi.useSearch();
  const nameField = useField({ initialValue: searchParams.name });
  const name = nameField.watch();
  const debouncedName = useDebounceValue(name, 500);

  const [types, setTypes] = useState<string[]>(searchParams.types);
  const debouncedTypes = useDebounceValue(types, 500);

  const getPokemonsInfinityQuery = useGetStatisticPokemonsInfiniteQuery(
    {
      offset: POKEMONS_REQUESTS_PAGINATION.OFFSET,
      limit: POKEMONS_REQUESTS_PAGINATION.LIMIT,
      ...(debouncedName && { name: debouncedName }),
      ...(debouncedTypes && { types: debouncedTypes })
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

  useDidUpdate(() => {
    navigate({ search: { name, types } });
  }, [name, types]);

  const onRefreshClick = () => getPokemonsInfinityQuery.refetch();

  const pokemons =
    getPokemonsInfinityQuery.data?.pages?.flatMap((page) => page.data.response.pokemons) ?? [];

  const onTypesSelect = (types: string[]) => {
    setTypes(types);
    navigate({ search: { types, name } });
  };

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
      nameField,
      types
    },
    functions: {
      onRefreshClick,
      onTypesSelect
    }
  };
};
