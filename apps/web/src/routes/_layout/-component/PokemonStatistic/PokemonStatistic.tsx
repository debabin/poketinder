import {
  PokemonStatisticContent,
  PokemonStatisticPlaceholder,
  PokemonStatisticSkeleton
} from './components';
import { usePokemonStatistic } from './hooks/usePokemonStatistic';

export const PokemonStatistic = () => {
  const { state } = usePokemonStatistic();

  if (!state.prevPokemonId) return <PokemonStatisticPlaceholder />;

  return (
    <>
      {(state.loading || !state.pokemon) && <PokemonStatisticSkeleton />}
      {!state.loading && state.statistic && state.pokemon && (
        <PokemonStatisticContent statistic={state.statistic} pokemon={state.pokemon} />
      )}
    </>
  );
};
