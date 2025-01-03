import { createFileRoute } from '@tanstack/react-router';

import { Skeleton } from '@/components/ui';
import { getStatisticTopOptions } from '@/utils/api/options';

import { StatisticWinnerPokemonSkeleton } from './-components';
import { POKEMON_TOP } from './-constants';

export const LoadingStatsTop = () => (
  <>
    <div className='flex justify-between gap-3 mb-6 flex-col md:flex-row'>
      {Array.from({ length: POKEMON_TOP.WINNER }).map((_, index) => (
        <StatisticWinnerPokemonSkeleton key={index} />
      ))}
    </div>

    <div className='flex flex-col gap-3'>
      {Array.from({ length: POKEMON_TOP.PLACES - POKEMON_TOP.WINNER }).map((_, index) => (
        <Skeleton key={index} className='h-16 w-full bg-gray-100' />
      ))}
    </div>
  </>
);

export const Route = createFileRoute('/_layout/stats/_layout/top/')({
  loader: async ({ context }) =>
    context.queryClient.ensureQueryData(
      getStatisticTopOptions({ params: { count: POKEMON_TOP.PLACES } })
    ),
  pendingComponent: LoadingStatsTop
});
