import { useLocalStorage } from '@siberiacancode/reactuse';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import { LOCAL_STORAGE_KEYS } from '@/utils';
import { useGetPokemonSuspenseQuery } from '@/utils/api/hooks';
import { getStatisticPokemon } from '@/utils/api/requests';
import { getRandomPokemonId } from '@/utils/helpers/pokemon';

export const useMainPage = () => {
  const [randomPokemonId, setRandomPokemonId] = useState(getRandomPokemonId);
  const getPokemonQuery = useGetPokemonSuspenseQuery({ params: { pokemonId: randomPokemonId } });

  const prevPokemonIdStorage = useLocalStorage<number>(LOCAL_STORAGE_KEYS.PREV_POKEMON_ID);
  const getStatisticPokemonQuery = useQuery({
    queryKey: ['stats'],
    queryFn: () => getStatisticPokemon({ params: { pokemonId: prevPokemonIdStorage.value! } }),
    enabled: !!prevPokemonIdStorage.value
  });

  const onActionClick = (action: 'pass' | 'smash') => {
    prevPokemonIdStorage.set(randomPokemonId);
    setRandomPokemonId(getRandomPokemonId());
    console.log('@', action);
  };

  return {
    state: {
      pokemon: getPokemonQuery.data.data.pokemon,
      statistic: getStatisticPokemonQuery.data?.data.statistic
    },
    functions: {
      onActionClick
    }
  };
};
