import { queryOptions } from '@tanstack/react-query';

import type { GetStatisticTopRequestConfig } from '../requests';

import { getStatisticTop } from '../requests';

export const getStatisticTopOptions = (requestConfig: GetStatisticTopRequestConfig) =>
  queryOptions({
    queryKey: ['getStatisticTop', requestConfig.params.count],
    queryFn: () => getStatisticTop(requestConfig)
  });
