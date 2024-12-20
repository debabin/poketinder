import { PokemonStatisticContent, PokemonStatisticSkeleton } from './components';
import { usePokemonStatistic } from './hooks/usePokemonStatistic';

export const PokemonStatistic = () => {
  const { state } = usePokemonStatistic();

  return (
    <>
      {state.loading && <PokemonStatisticSkeleton />}
      {!state.loading && state.statistic && state.pokemon && (
        <PokemonStatisticContent statistic={state.statistic} pokemon={state.pokemon} />
      )}
    </>
  );
};
