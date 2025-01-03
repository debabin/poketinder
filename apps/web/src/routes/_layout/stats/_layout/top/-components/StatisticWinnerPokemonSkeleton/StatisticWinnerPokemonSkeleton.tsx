import {
  Card,
  PokemonCardTitleSkeleton,
  PokemonCardTypesSkeleton,
  Skeleton
} from '@/components/ui';

export const StatisticWinnerPokemonSkeleton = () => (
  <div className='w-full flex flex-col gap-4'>
    <Skeleton className='h-[100px] w-full' />

    <Card className='w-full p-3 flex flex-col gap-2'>
      <PokemonCardTypesSkeleton />
      <PokemonCardTitleSkeleton />
      <Skeleton className='w-full h-4' />
    </Card>
  </div>
);
