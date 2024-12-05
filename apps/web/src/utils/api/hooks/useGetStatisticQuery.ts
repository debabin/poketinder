import { useQuery } from '@tanstack/react-query';

import type { GetStatisticParams } from '../requests';

import { getStatistic } from '../requests';

export const useGetStatisticQuery = (
  params: GetStatisticParams,
  settings?: QuerySettings<typeof getStatistic>
) =>
  useQuery({
    queryKey: ['getStatistic', params.pokemonId],
    queryFn: () => getStatistic({ params, config: settings?.config }),
    ...settings?.options
  });
