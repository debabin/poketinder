import { createLazyFileRoute } from '@tanstack/react-router';
import { Fragment } from 'react';

import { useStatsPage } from './-hooks/useStatsPage';

const StatsPage = () => {
  const { state } = useStatsPage();

  return (
    <main className='flex justify-center items-center h-full'>
      {state.pages.map((response, index) => (
        <Fragment key={index}>
          {response.data.response.pokemons.map((pokemon) => (
            <div key={pokemon.id}>
              <img alt={pokemon.name} src={pokemon.image} />
            </div>
          ))}
        </Fragment>
      ))}
    </main>
  );
};

export const Route = createLazyFileRoute('/stats/')({
  component: StatsPage
});
