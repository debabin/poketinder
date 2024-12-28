import { motion } from 'motion/react';

import {
  Card,
  PokemonStatisticLine,
  PokemonType,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui';
import { cn } from '@/lib/utils';

import { useStatisticTopListTab } from './hooks/useStatisticTopListTab';

export const StatisticTopListTab = () => {
  const { state } = useStatisticTopListTab();

  return (
    <>
      {!!state.winnerPokemons.length && (
        <>
          {state.winnerPokemons.map((pokemon) => (
            <div key={pokemon.id}>{pokemon.name}</div>
          ))}
        </>
      )}
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

                {pokemon.statistic && (
                  <div className='col-span-5 flex gap-2 justify-center items-center'>
                    <div
                      className={cn(
                        pokemon.statistic.smash > pokemon.statistic.pass && 'font-semibold',
                        'text-sm'
                      )}
                    >
                      {Math.round(
                        (pokemon.statistic.smash /
                          (pokemon.statistic.pass + pokemon.statistic.smash)) *
                          100
                      )}
                      %
                    </div>

                    <div className='w-full flex gap-1 max-w-[250px]'>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger
                            style={{
                              width: `${(pokemon.statistic.smash / (pokemon.statistic.pass + pokemon.statistic.smash)) * 100}%`
                            }}
                          >
                            <PokemonStatisticLine action='smash' />
                          </TooltipTrigger>
                          <TooltipContent>smashes: {pokemon.statistic.smash}</TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger
                            style={{
                              width: `${(pokemon.statistic.pass / (pokemon.statistic.pass + pokemon.statistic.smash)) * 100}%`
                            }}
                          >
                            <PokemonStatisticLine action='pass' />
                          </TooltipTrigger>
                          <TooltipContent>passes: {pokemon.statistic.pass}</TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <div
                      className={cn(
                        !(pokemon.statistic.smash > pokemon.statistic.pass) && 'font-semibold',
                        'text-sm'
                      )}
                    >
                      {Math.round(
                        (pokemon.statistic.pass /
                          (pokemon.statistic.pass + pokemon.statistic.smash)) *
                          100
                      )}
                      %
                    </div>
                  </div>
                )}
              </Card>
            </motion.li>
          ))}
        </motion.ul>
      )}
    </>
  );
};
