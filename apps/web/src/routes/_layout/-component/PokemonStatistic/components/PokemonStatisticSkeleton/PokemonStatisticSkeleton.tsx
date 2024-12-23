import { useInterval } from '@siberiacancode/reactuse';
import { useState } from 'react';

import { Skeleton } from '@/components/ui';

const CHANGE_STATISTIC_INTERVAL = 3_000;

export const PokemonStatisticSkeleton = () => {
  const [statistic, setStatistic] = useState({ pass: 50, smash: 50 });

  useInterval(() => {
    const pass = Math.floor(Math.random() * 100) + 1;
    const smash = 100 - pass;
    setStatistic({ pass, smash });
  }, CHANGE_STATISTIC_INTERVAL);

  return (
    <div className='flex flex-col gap-2 justify-center'>
      <div className='text-center flex gap-2 justify-center items-center'>
        What Others Chose for <Skeleton className='h-4 w-16 rounded-md' />
      </div>

      <div className='flex gap-2 justify-center'>
        <div className='flex flex-col gap-1 items-end w-full'>
          <div>Passes</div>
          <div
            className='h-6 bg-red-200 rounded-md transition-all ease-in duration-500'
            style={{ width: `${statistic.pass}%` }}
          />
          <Skeleton className='h-4 w-6 rounded-md' />
        </div>

        <div className='relative flex items-center justify-center h-[100px] w-full'>
          <Skeleton className='absolute inset-0 h-full w-full rounded-lg' />
        </div>

        <div className='flex flex-col gap-2 items-start w-full'>
          <div>Smashes</div>
          <div
            className='h-6 bg-green-200 rounded-md transition-all ease-in duration-500'
            style={{ width: `${statistic.smash}%` }}
          />
          <Skeleton className='h-4 w-6 rounded-md' />
        </div>
      </div>
    </div>
  );
};
