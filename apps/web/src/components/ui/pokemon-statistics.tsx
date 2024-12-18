import React from 'react';

import { cn } from '@/lib/utils';

export interface PokemonStatisticProps extends React.ComponentProps<'div'> {
  action: 'pass' | 'smash';
}

const PokemonStatisticLine = React.forwardRef<HTMLDivElement, PokemonStatisticProps>(
  ({ className, action, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'h-6 rounded-md transition-all ease-in duration-300 w-full',
        action === 'pass' ? 'bg-red-300' : 'bg-green-300',
        className
      )}
      {...props}
    />
  )
);
PokemonStatisticLine.displayName = 'PokemonStatistic';

export { PokemonStatisticLine };
