import { useMemo } from 'react';

import type { PokemonStatistic } from '@/generated/api';

import {
    Card,
    PokemonCard,
    PokemonCardBackground,
    PokemonCardImage,
    PokemonCardTitle,
    PokemonCardTypes
} from '@/components/ui';
import { getPokemonBackground } from '@/utils/helpers';

import { StatisticLine } from '../../../../-components';

interface StatisticWinnerPokemonProps {
    place: number;
    pokemon: PokemonStatistic;
}

const MEDALS = ['🥇', '🥈', '🥉'];

export const StatisticWinnerPokemon = ({ pokemon, place }: StatisticWinnerPokemonProps) => {
    const pokemonBackground = useMemo(() => getPokemonBackground(pokemon.types[0]), [pokemon.id]);
    console.log('@@@', `backgrounds/bg-${pokemonBackground}.png`);

    return (
        <div key={pokemon.id} className='w-full flex flex-col gap-4'>
            <PokemonCard className='h-[100px] w-full' pokemon={pokemon}>
                <PokemonCardBackground src={`/backgrounds/bg-${pokemonBackground}.png`} />
                <PokemonCardImage className='min-h-32 min-w-32' />
            </PokemonCard>

            <Card className='w-full p-3 flex flex-col gap-2'>
                <PokemonCardTypes types={pokemon.types} />
                <div className='flex gap-2'>
                    <span className='text-3xl'>{MEDALS[place - 1]}</span>
                    <PokemonCardTitle className='text-3xl text-gray-900 capitalize'>
                        {pokemon.name}
                    </PokemonCardTitle>
                </div>
                <StatisticLine statistic={pokemon.statistic} />
            </Card>

        </div>
    );
};
