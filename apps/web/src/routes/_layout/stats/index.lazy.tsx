import { createLazyFileRoute } from '@tanstack/react-router';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui';

import { StatisticListTab, StatisticTopListTab } from './-components';

const StatsPage = () => (
  <>
    <h1 className='text-5xl font-light text-left mb-8'>Statistic page</h1>
    <Tabs defaultValue='top-20'>
      <div className='flex justify-start'>
        <TabsList className='mb-2'>
          <TabsTrigger value='top-20'>🏆 Top 20 pokemons</TabsTrigger>
          <TabsTrigger value='list'>📊 Statistic list</TabsTrigger>
        </TabsList>
      </div>
      <TabsContent value='top-20'>
        <StatisticTopListTab />
      </TabsContent>
      <TabsContent value='list'>
        <StatisticListTab />
      </TabsContent>
    </Tabs>
  </>
);

export const Route = createLazyFileRoute('/_layout/stats/')({
  component: StatsPage
});
