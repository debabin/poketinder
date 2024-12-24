import { Heart, Trash } from 'lucide-react';
import { motion } from 'motion/react';

import {
  Button,
  PokemonCard,
  PokemonCardBackground,
  PokemonCardContent,
  PokemonCardDescription,
  PokemonCardImage,
  PokemonCardTitle,
  PokemonCardTypes,
  Skeleton,
  Spinner
} from '@/components/ui';
import { getPokemonBackground } from '@/utils/helpers/pokemon';

import { usePokemonSwiper } from './hooks/usePokemonSwiper';

export const PokemonSwiper = () => {
  const { state, functions } = usePokemonSwiper();

  return (
    <div className='flex gap-4 flex-col relative'>
      <motion.div
        drag
        dragElastic={{
          top: 0.2,
          bottom: 0.2,
          right: 0.5,
          left: 0.5
        }}
        style={{
          x: state.card.x,
          rotate: state.card.rotate
        }}
        whileDrag={{
          scale: 1.05
        }}
        animate={state.card.controls}
        className='w-[350px]'
        dragConstraints={{
          left: 0,
          bottom: 0,
          top: 0,
          right: 0
        }}
        onDragEnd={(_event, info) => {
          if (state.pending.action || state.loading.pokemon) return;
          if (info.offset.x > -300 && info.offset.x < 300) return;
          const action = info.offset.x > 0 ? 'smash' : 'pass';
          functions.onCardDragEnd(action);
        }}
      >
        <motion.div
          style={{
            opacity: state.card.opacity
          }}
        >
          {!state.pokemon && (
            <div className='relative h-[450px] bg-gray-100 rounded-lg overflow-hidden'>
              <div className='absolute h-full w-full left-0 top-0 flex justify-center items-center'>
                <Spinner className='stroke-gray-300 size-12' />
              </div>

              <div className='absolute bottom-0 left-0 right-0 z-30 p-4 w-full'>
                <Skeleton className='h-10 w-1/2 mb-2' />
                <div className='flex gap-2'>
                  <Skeleton className='h-4 w-12' />
                  <Skeleton className='h-4 w-12' />
                </div>
                <Skeleton className='h-8 w-full mt-4' />
              </div>
            </div>
          )}
          {state.pokemon && (
            <PokemonCard className='h-[450px]' pokemon={state.pokemon}>
              <PokemonCardBackground
                src={`backgrounds/bg-${getPokemonBackground(state.pokemon.types[0])}.png`}
              />
              <div className='absolute bottom-0 top-0 right-0 left-0 z-[1]' />
              <PokemonCardImage loading='lazy' />
              <PokemonCardContent className='text-left'>
                <PokemonCardTitle className='text-5xl' />
                <PokemonCardTypes />
                <PokemonCardDescription>{state.pokemon.description}</PokemonCardDescription>
              </PokemonCardContent>
            </PokemonCard>
          )}
        </motion.div>

        <motion.div
          className='flex items-center justify-center size-16 rounded-full shadow-md absolute bottom-[-20px] right-0 left-0 m-auto'
          style={{ background: state.card.color, opacity: state.card.like }}
        >
          <Heart className='text-white size-8' />
        </motion.div>

        <motion.div
          className='flex items-center justify-center size-16 rounded-full shadow-md absolute bottom-[-20px] right-0 left-0 m-auto'
          style={{ background: state.card.color, opacity: state.card.trash }}
        >
          <Trash className='text-white size-8' />
        </motion.div>
      </motion.div>

      <div className='flex gap-2'>
        <Button
          className='w-full hover:bg-red-100'
          disabled={state.pending.action || state.loading.pokemon}
          variant='outline'
          onClick={() => functions.onActionClick('pass')}
        >
          <Trash className='size-4 mr-2' />
          PASS
        </Button>
        <Button
          className='w-full hover:bg-green-100'
          disabled={state.pending.action || state.loading.pokemon}
          variant='outline'
          onClick={() => functions.onActionClick('smash')}
        >
          <Heart className='size-4 mr-2' />
          SMASH
        </Button>
      </div>
    </div>
  );
};
