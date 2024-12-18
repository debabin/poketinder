import { useInfiniteQuery } from '@tanstack/react-query';

import type { GetStatisticPokemonsParams } from '../requests';

import { getPokemons } from '../requests';

export const useGetStatisticPokemonsInfiniteQuery = (
  params: GetStatisticPokemonsParams,
  settings?: InfinityQuerySettings<typeof getPokemons>
) =>
  useInfiniteQuery({
    initialPageParam: 0,
    queryKey: ['getPokemons', ...Object.values(params)],
    queryFn: ({ pageParam }) =>
      getPokemons({
        params: { ...params, offset: params.offset + (pageParam as number) * params.limit },
        config: settings?.config
      }),
    getNextPageParam: (lastPage) => {
      if (lastPage && lastPage.data.response.next) {
        return lastPage.data.response.page;
      }
      return undefined;
    },
    ...settings?.options
  });
