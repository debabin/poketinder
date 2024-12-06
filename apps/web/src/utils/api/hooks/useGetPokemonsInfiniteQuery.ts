import { useInfiniteQuery } from '@tanstack/react-query';

import type { GetPokemonsParams } from '../requests';

import { getPokemons } from '../requests';

export const useGetPokemonsInfiniteQuery = (
  params: GetPokemonsParams,
  settings?: InfinityQuerySettings<typeof getPokemons>
) =>
  useInfiniteQuery({
    initialPageParam: 1,
    queryKey: ['getPokemons', ...Object.values(params)],
    queryFn: ({ pageParam = 1 }) =>
      getPokemons({
        params: { ...params, offset: params.offset * (pageParam as number) },
        config: settings?.config
      }),
    getNextPageParam: (lastPage) => {
      if (lastPage && lastPage.data.response.next) {
        return lastPage.data.response.page + 1;
      }
      return undefined;
    },
    ...settings?.options
  });
