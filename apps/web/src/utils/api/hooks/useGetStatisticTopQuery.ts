import { useQuery } from '@tanstack/react-query';

import type { GetStatisticTopParams } from '../requests';

import { getStatisticTop } from '../requests';

export const useGetStatisticTopQuery = (
  params: GetStatisticTopParams,
  settings?: QuerySettings<typeof getStatisticTop>
) =>
  useQuery({
    queryKey: ['getStatisticTop', params.count],
    queryFn: () => getStatisticTop({ params, config: settings?.config }),
    ...settings?.options
  });
