import { createLazyFileRoute } from '@tanstack/react-router';
import { RefreshCwIcon } from 'lucide-react';
import { motion } from 'motion/react';

import { Button, Card, Input, PokemonType, Skeleton } from '@/components/ui';
import { cn } from '@/lib/utils';

import { StatisticLine } from '../../-components';
import { TypesCombobox } from './-components';
import { useStatisticListTab } from './-hooks/useStatisticListTab';

const POKEMON_TYPES = [
  'normal',
  'fighting',
  'flying',
  'poison',
  'ground',
  'rock',
  'bug',
  'ghost',
  'steel',
  'fire',
  'water',
  'grass',
  'electric',
  'psychic',
  'ice',
  'dragon',
  'dark',
  'fairy'
];

const StatsListPage = () => {
  const { refs, state, functions } = useStatisticListTab();

  return (
    <>
      <div className='flex gap-2 mb-4'>
        <div>
          <Input
            {...state.nameField.register()}
            className='w-full'
            disabled={state.isFetching}
            id='searchName'
            placeholder='Search by name'
          />
        </div>
        <div>
          <TypesCombobox
            disabled={state.isFetching}
            items={POKEMON_TYPES.map((type) => ({ label: type, value: type }))}
            values={state.types}
            onSelect={functions.onTypesSelect}
          />
        </div>
        <div>
          <Button disabled={state.isFetching} variant='outline' onClick={functions.onRefreshClick}>
            <RefreshCwIcon className='size-5' />
          </Button>
        </div>
      </div>
      {!state.isLoading && (
        <motion.ul
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.05 } }
          }}
          animate='visible'
          className={cn('flex flex-col gap-3 mb-24', { 'animate-pulse': state.isFetching })}
          initial='hidden'
        >
          {state.pokemons.map((pokemon) => (
            <motion.li
              key={pokemon.id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
              className='flex gap-2 justify-center items-center'
            >
              <Card className='w-full grid grid-cols-12 gap-4 py-2 px-4 items-center'>
                <div className='col-span-1 text-center'>
                  <p className='text-xl font-extralight capitalize text-gray-600'>
                    #{pokemon.pokemonId}
                  </p>
                </div>

                <div className='col-span-3 flex justify-start gap-4 items-center'>
                  <img alt={pokemon.name} className='size-12 object-contain' src={pokemon.image} />
                  <div className='flex flex-col gap-1 items-start'>
                    <div className='flex gap-1'>
                      {pokemon.types.map((type) => (
                        <PokemonType key={type}>{type}</PokemonType>
                      ))}
                    </div>
                    <span className='font-medium capitalize'>{pokemon.name}</span>
                  </div>
                </div>

                <div className='col-span-3' />

                {pokemon.statistic && <StatisticLine statistic={pokemon.statistic} />}
              </Card>
            </motion.li>
          ))}
        </motion.ul>
      )}

      {(state.isLoading || state.isLoadMore) && (
        <div className='flex flex-col gap-3'>
          {Array.from({ length: 20 }).map((_, index) => (
            <Skeleton key={index} className='h-16 w-full bg-gray-100' />
          ))}
        </div>
      )}

      <div ref={refs.container} />
    </>
  );
};

export const Route = createLazyFileRoute('/_layout/stats/_layout/list/')({
  component: StatsListPage
});
