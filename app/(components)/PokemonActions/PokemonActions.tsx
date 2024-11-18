'use client';

import { Heart, Trash } from 'lucide-react';
import { useTransition } from 'react';

import { Button } from '@/components/ui';

import { pokemonAction } from '../../(actions)/pokemonAction';

interface PokemonActionsProps {
  pokemonId: number;
}

export const PokemonActions = ({ pokemonId }: PokemonActionsProps) => {
  const [isPending, startTransition] = useTransition();

  const onActionClick = (action: 'pass' | 'smash') =>
    startTransition(() => pokemonAction(pokemonId, action));

  return (
    <div className='flex gap-2'>
      <Button
        className='w-full hover:bg-red-100'
        disabled={isPending}
        variant='outline'
        onClick={() => onActionClick('pass')}
      >
        <Trash className='size-4 mr-2' />
        PASS
      </Button>
      <Button
        className='w-full hover:bg-green-100'
        disabled={isPending}
        variant='outline'
        onClick={() => onActionClick('smash')}
      >
        <Heart className='size-4 mr-2' />
        SMASH
      </Button>
    </div>
  );
};
