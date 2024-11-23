import { eq } from 'drizzle-orm';
import { cookies } from 'next/headers';

import { COOKIES } from '@/utils/constants';
import { orm } from '@/utils/database/instance';
import { pokemonTable, statisticTable } from '@/utils/database/schema';
import { getPokemonBackground, getRandomPokemonId } from '@/utils/helpers';

import {
  PokemonActions,
  PokemonCard,
  PokemonCardBackground,
  PokemonCardContent,
  PokemonCardDescription,
  PokemonCardImage,
  PokemonCardTitle,
  PokemonCardTypes,
  PokemonStatistic
} from './(components)';

const Home = async () => {
  const prevPokemonIdCookie = (await cookies()).get(COOKIES.PREV_POKEMON_ID);
  const prevPokemonId = Number(prevPokemonIdCookie?.value ?? 1);

  const statistic = (await orm.query.statisticTable.findFirst({
    where: eq(statisticTable.pokemonId, prevPokemonId)
  }));

  const prevPokemon = (await orm.query.pokemonTable.findFirst({
    where: eq(pokemonTable.pokemonId, prevPokemonId)
  }))!;

  const pokemonId = getRandomPokemonId();
  const pokemon = (await orm.query.pokemonTable.findFirst({
    where: eq(pokemonTable.pokemonId, pokemonId)
  }))!;

  console.log('@@@pokemon', pokemon, pokemonId)

  return (
    <main className='flex justify-center items-center h-full'>
      <div className='flex gap-4 flex-col'>
        <div className='w-[350px]'>
          <PokemonCard className='h-[400px]' pokemon={pokemon}>
            <PokemonCardBackground
              src={`backgrounds/bg-${getPokemonBackground(pokemon.types[0])}.png`}
            />
            <PokemonCardImage />
            <PokemonCardContent>
              <PokemonCardTitle />
              <PokemonCardTypes />
              <PokemonCardDescription>
                {pokemon.description}
              </PokemonCardDescription>
            </PokemonCardContent>
          </PokemonCard>
        </div>

        <div>
          <PokemonActions pokemonId={pokemonId} />
        </div>

        {statistic && <div>
          <PokemonStatistic
            pokemon={prevPokemon}
            statistic={statistic}
          />
        </div>}
      </div>
    </main>
  );
};

export default Home;
