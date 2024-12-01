import { createLazyFileRoute } from '@tanstack/react-router';
import { Heart, Trash } from 'lucide-react';

import {
  Button,
  PokemonCard,
  PokemonCardBackground,
  PokemonCardContent,
  PokemonCardDescription,
  PokemonCardImage,
  PokemonCardTitle,
  PokemonCardTypes
} from '@/components/ui';
import { ROUTES } from '@/utils';
import { getPokemonBackground } from '@/utils/helpers/pokemon';

import { PokemonStatistic } from './-component/PokemonStatistic/PokemonStatistic';
import { useMainPage } from './-hooks/useMainPage';

const MainPage = () => {
  const { state, functions } = useMainPage();

  return (
    <main className='flex justify-center items-center h-full'>
      <div className='flex gap-4 flex-col'>
        {state.pokemon && (
          <div className='w-[350px]'>
            <PokemonCard className='h-[400px]' pokemon={state.pokemon}>
              <PokemonCardBackground
                src={`backgrounds/bg-${getPokemonBackground(state.pokemon.types[0])}.png`}
              />
              <PokemonCardImage />
              <PokemonCardContent className='text-left'>
                <PokemonCardTitle />
                <PokemonCardTypes />
                <PokemonCardDescription>{state.pokemon.description}</PokemonCardDescription>
              </PokemonCardContent>
            </PokemonCard>
          </div>
        )}

        <div className='flex gap-2'>
          <Button
            className='w-full hover:bg-red-100'
            disabled={false}
            variant='outline'
            onClick={() => functions.onActionClick('pass')}
          >
            <Trash className='size-4 mr-2' />
            PASS
          </Button>
          <Button
            className='w-full hover:bg-green-100'
            disabled={false}
            variant='outline'
            onClick={() => functions.onActionClick('smash')}
          >
            <Heart className='size-4 mr-2' />
            SMASH
          </Button>
        </div>

        {state.statistic && (
          <PokemonStatistic statistic={state.statistic} pokemon={state.pokemon} />
        )}
      </div>
    </main>
  );
};

export const Route = createLazyFileRoute(ROUTES.MAIN)({
  component: MainPage
});
