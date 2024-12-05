import { useMutation } from '@tanstack/react-query';

import type { PostStatisticActionRequestConfig } from '../requests';

import { postStatisticAction } from '../requests';

export const usePostStatisticActionMutation = (
  settings?: MutationSettings<PostStatisticActionRequestConfig, typeof postStatisticAction>
) =>
  useMutation({
    mutationKey: ['postStatisticAction'],
    mutationFn: ({ params, config }) =>
      postStatisticAction({ params, config: { ...settings?.config, ...config } }),
    ...settings?.options
  });
