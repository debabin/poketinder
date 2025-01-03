import { createFileRoute, Link, Outlet, useLocation } from '@tanstack/react-router';

import { Tabs, TabsList, TabsTrigger } from '@/components/ui';

const StatsLayout = () => {
  const { pathname } = useLocation();

  return (
    <div className='pt-4'>
      <h1 className='text-5xl font-light text-left mb-8'>Statistic page</h1>
      <Tabs defaultValue={pathname}>
        <div className='flex justify-start mb-4'>
          <TabsList className='mb-2'>
            <Link to='/stats/top'>
              <TabsTrigger value='/stats/top'>🏆 Top 20 pokemons</TabsTrigger>
            </Link>
            <Link search={{ types: [], name: '' }} to='/stats/list'>
              <TabsTrigger value='/stats/list'>📊 Statistic list</TabsTrigger>
            </Link>
          </TabsList>
        </div>
        <Outlet />
      </Tabs>
    </div>
  );
};

export const Route = createFileRoute('/_layout/stats/_layout')({
  component: StatsLayout
});
