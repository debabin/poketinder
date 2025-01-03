import { createLazyFileRoute } from '@tanstack/react-router';
import { motion } from 'motion/react';

import { Card, PokemonType } from '@/components/ui';
import { cn } from '@/lib/utils';

import { StatisticLine } from '../../-components';
import { StatisticWinnerPokemon } from './-components';
import { useStatisticTopListTab } from './-hooks/useStatisticTopListTab';

const StatsListPage = () => {
  const { state } = useStatisticTopListTab();

  return (
    <>
      {!state.isLoading && (
        <>
          {!!state.winnerPokemons.length && (
            <div className='flex justify-between flex-col md:flex-row gap-3 mb-6'>
              {state.winnerPokemons.map((pokemon, index) => (
                <StatisticWinnerPokemon key={pokemon.id} place={index + 1} pokemon={pokemon} />
              ))}
            </div>
          )}

          <motion.ul
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.05 } }
            }}
            animate='visible'
            className={cn('flex flex-col gap-3', { 'animate-pulse': state.isFetching })}
            initial='hidden'
          >
            {state.otherPokemons.map((pokemon) => (
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
                    <img
                      alt={pokemon.name}
                      className='size-12 object-contain'
                      src={pokemon.image}
                      loading='lazy'
                    />
                    <div className='flex flex-col gap-1 items-start'>
                      <div className='flex gap-1'>
                        {pokemon.types.map((type) => (
                          <PokemonType key={type}>{type}</PokemonType>
                        ))}
                      </div>
                      <span className='font-normal capitalize'>{pokemon.name}</span>
                    </div>
                  </div>

                  <div className='col-span-3' />

                  {pokemon.statistic && <StatisticLine statistic={pokemon.statistic} />}
                </Card>
              </motion.li>
            ))}
          </motion.ul>
        </>
      )}
    </>
  );
};

export const Route = createLazyFileRoute('/_layout/stats/_layout/top/')({
  component: StatsListPage
});
