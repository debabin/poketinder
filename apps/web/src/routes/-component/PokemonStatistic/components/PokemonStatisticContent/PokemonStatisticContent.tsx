import { useMemo } from 'react';

import type { Pokemon, StatisticPokemon } from '@/generated/api';

import {
  PokemonCard,
  PokemonCardBackground,
  PokemonCardImage,
  pokemonTypesVariants
} from '@/components/ui';
import { cn } from '@/lib/utils';
import { getPokemonBackground } from '@/utils/helpers';

interface PokemonStatisticContentProps {
  pokemon: Pokemon;
  statistic: StatisticPokemon;
}

export const PokemonStatisticContent = ({ statistic, pokemon }: PokemonStatisticContentProps) => {
  const total = statistic.pass + statistic.smash;
  const pokemonBackground = useMemo(() => getPokemonBackground(pokemon.types[0]), [pokemon.id]);

  return (
    <div className='flex flex-col gap-2 justify-center'>
      <div className='flex gap-2 items-center justify-center'>
        What Others Chose for{' '}
        <span className={cn(pokemonTypesVariants({ type: pokemon.types[0] }))}>{pokemon.name}</span>
      </div>
      <div className='flex gap-2 justify-center'>
        <div className='flex flex-col gap-1 items-end w-full'>
          <div>Passes</div>
          <div
            className='h-6 bg-red-300 rounded-md transition-all ease-in duration-300'
            style={{ width: `${(statistic.pass / total) * 100}%` }}
          />
          <div>{statistic.pass}</div>
        </div>
        <PokemonCard className='h-[100px] w-full' pokemon={pokemon}>
          <PokemonCardBackground src={`backgrounds/bg-${pokemonBackground}.png`} />
          <PokemonCardImage className='min-h-26 min-w-26' />
        </PokemonCard>
        <div className='flex flex-col gap-1 items-start w-full'>
          <div>Smashes</div>
          <div
            className='h-6 bg-green-300 rounded-md transition-all ease-in duration-300'
            style={{ width: `${(statistic.smash / total) * 100}%` }}
          />
          <div>{statistic.smash}</div>
        </div>
      </div>
    </div>
  );
};
