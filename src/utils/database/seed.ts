import { getPokemon, getPokemons, getPokemonSpecies } from '../api/requests';
import { MAX_POKEMON_COUNTS } from '../constants';
import { orm } from './instance';
import { pokemonTable } from './schema';

export const seed = async () => {
  const pokemons = await orm.select().from(pokemonTable);
  if (pokemons.length) return;

  const pokemonsResponse = await getPokemons({ params: { limit: MAX_POKEMON_COUNTS, offset: 0 } });

  const promises = pokemonsResponse.data.results.map(async (pokemon) => {
    const pokemonResponse = await getPokemon({ params: { id: pokemon.name }, config: { cache: 'force-cache' } });
    const pokemonSpeciesResponse = await getPokemonSpecies({ params: { id: pokemonResponse.data.id }, config: { cache: 'force-cache' } });
    await new Promise(res => setTimeout(res, 1000));
    return {
      pokemonResponse,
      pokemonSpeciesResponse
    };
  });

  const responses = [];

  for (let i = 0; i < MAX_POKEMON_COUNTS; i++) {
    responses.push(await promises[i]);
  };

  const values = responses.map(({ pokemonResponse, pokemonSpeciesResponse }) => ({
    pokemonId: pokemonResponse.data.id,
    name: pokemonResponse.data.name,
    image:
      pokemonResponse.data.id < 649
        ? pokemonResponse.data.sprites.versions['generation-v']['black-white'].animated.front_default!
        : pokemonResponse.data.sprites.front_default!,
    description:
      pokemonSpeciesResponse.data.flavor_text_entries
        .find((text) => text.language.name === 'en')
        ?.flavor_text.replaceAll(/\f/g, ' ') ?? 'Succelent, Beautiful.',
    types: pokemonResponse.data.types.map((type) => type.type.name)
  }))


  await orm.insert(pokemonTable).values(values);
};