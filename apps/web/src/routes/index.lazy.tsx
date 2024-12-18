import { createLazyFileRoute } from '@tanstack/react-router';

import { PokemonStatistic, PokemonSwiper } from './-component';

const MainPage = () => (
  <main className='flex justify-center items-center h-full'>
    <div className='flex gap-4 flex-col'>
      <PokemonSwiper />
      <PokemonStatistic />
    </div>
  </main>
);

export const Route = createLazyFileRoute('/')({
  component: MainPage
});
