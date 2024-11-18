import type { PokemonSpecies } from '@/generated/api/models';
import { pokeApi } from '@/utils/api/instance';
import { getPokemon } from '@/utils/api/requests';
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
  const pokemonId = getRandomPokemonId();
  const pokemonResponse = await getPokemon({
    params: {
      id: pokemonId
    }
  });

  const pokemonSpeciesResponse = await pokeApi.get<PokemonSpecies>(
    `pokemon-species/${pokemonResponse.data.id}`
  );

  return (
    <main className='flex justify-center items-center h-full'>
      <div className='flex gap-4 flex-col'>
        <div className='w-[300px]'>
          <PokemonCard className=' h-[400px]' pokemon={pokemonResponse.data}>
            <PokemonCardBackground
              src={`backgrounds/bg-${getPokemonBackground(pokemonResponse.data.types[0].type.name)}.png`}
            />
            <PokemonCardImage />
            <PokemonCardContent>
              <PokemonCardTitle />
              <PokemonCardTypes />
              <PokemonCardDescription>
                {pokemonSpeciesResponse.data.flavor_text_entries[0].flavor_text}
              </PokemonCardDescription>
            </PokemonCardContent>
          </PokemonCard>
        </div>

        <div>
          <PokemonActions pokemonId={pokemonResponse.data.id} />
        </div>

        <div>
          <PokemonStatistic pokemon={pokemonResponse.data} />
        </div>
      </div>
    </main>
  );
};

export default Home;
