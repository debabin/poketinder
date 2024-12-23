import { createLazyFileRoute } from '@tanstack/react-router';

import { PokemonStatistic, PokemonSwiper } from './-component';

const MainPage = () => (
  <main className='flex justify-center items-center h-full overflow-hidden'>
    <div className='flex gap-4 flex-col px-2 pt-10'>
      <PokemonSwiper />
      <PokemonStatistic />
    </div>
  </main>
);

export const Route = createLazyFileRoute('/_layout/')({
  component: MainPage
});
