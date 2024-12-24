import { useDidUpdate, useKeyPressEvent, useLocalStorage } from '@siberiacancode/reactuse';
import { keepPreviousData } from '@tanstack/react-query';
import { useState } from 'react';

import { useGetPokemonQuery, usePostStatisticActionMutation } from '@/utils/api/hooks';
import { LOCAL_STORAGE_KEYS } from '@/utils/constants';
import { getRandomPokemonId } from '@/utils/helpers';

import { useAnimationCard } from './useAnimationCard';

export const usePokemonSwiper = () => {
  const animationCard = useAnimationCard();
  const prevPokemonIdStorage = useLocalStorage<number>(LOCAL_STORAGE_KEYS.PREV_POKEMON_ID);

  const [randomPokemonId, setRandomPokemonId] = useState(getRandomPokemonId);
  const getPokemonQuery = useGetPokemonQuery(
    { pokemonId: randomPokemonId },
    {
      options: {
        placeholderData: keepPreviousData
      }
    }
  );

  useDidUpdate(() => {
    if (!getPokemonQuery.dataUpdatedAt) return;
    animationCard.controls.start({
      y: 0,
      opacity: 1
    });
  }, [getPokemonQuery.dataUpdatedAt]);

  const postStatisticActionMutation = usePostStatisticActionMutation();

  const pokemonAction = async (action: 'pass' | 'smash') => {
    await postStatisticActionMutation.mutateAsync({
      params: { pokemonId: randomPokemonId, action }
    });
    prevPokemonIdStorage.set(randomPokemonId);
    setRandomPokemonId(getRandomPokemonId());
  };

  const onAction = async (action: 'pass' | 'smash') => {
    await animationCard.controls.start({
      x: action === 'pass' ? -500 : 500,
      rotate: 45,
      opacity: 0,
      transition: { duration: 0.5 }
    });
    await animationCard.controls.set({
      y: -500,
      x: 0,
      transition: { duration: 0 }
    });
    await pokemonAction(action);
  };

  useKeyPressEvent('ArrowLeft', () => onAction('pass'));
  useKeyPressEvent('ArrowRight', () => onAction('smash'));

  return {
    state: {
      card: animationCard,
      pokemon: getPokemonQuery.data?.data.pokemon,
      loading: {
        pokemon: getPokemonQuery.isLoading
      },
      pending: {
        action: postStatisticActionMutation.isPending
      }
    },
    functions: {
      onActionClick: onAction,
      onCardDragEnd: onAction
    }
  };
};
