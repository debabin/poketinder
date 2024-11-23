'use client';

import { useEffect } from 'react';
import { io } from 'socket.io-client';

import type { Pokemon, Statistic } from '@/utils/database/schema';

import { cn } from '@/lib/utils';
import { getPokemonBackground } from '@/utils/helpers';

import {
  PokemonCard,
  PokemonCardBackground,
  PokemonCardImage,
  pokemonTypesVariants
} from '../PokemonCard/PokemonCard';

// "undefined" means the URL will be computed from the `window.location` object
const URL = process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:3000';

export const socket = io(URL);

interface PokemonStatisticProps {
  pokemon: Pokemon;
  statistic: Statistic;
}

export const PokemonStatistic = ({ pokemon, statistic }: PokemonStatisticProps) => {
  // const [isConnected, setIsConnected] = useState(socket.connected);
  // const [fooEvents, setFooEvents] = useState([]);

  useEffect(() => {
    function onConnect() {
      // setIsConnected(true);
    }

    function onDisconnect() {
      // setIsConnected(false);
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);

    socket.on('statistic', (data) => {
      console.log('statistic', data);
    });

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
    };
  }, []);

  const total = statistic.smash + statistic.pass;

  return (
    <div className='flex flex-col gap-2 justify-center'>
      <div className='text-center'>
        What Others Chose for{' '}
        <span className={cn(pokemonTypesVariants({ type: pokemon.types[0] }))}>
          {pokemon.name}
        </span>
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
          <PokemonCardBackground
            src={`backgrounds/bg-${getPokemonBackground(pokemon.types[0])}.png`}
          />
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
