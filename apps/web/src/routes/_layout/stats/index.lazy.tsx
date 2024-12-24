import { createLazyFileRoute } from '@tanstack/react-router';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui';

import { StatisticListTab } from './-components';

const StatsPage = () => (
  <>
    <h1 className='text-5xl font-light text-left mb-8'>Statistic page</h1>
    <Tabs defaultValue='stats'>
      <div className='flex justify-start'>
        <TabsList className='mb-2'>
          <TabsTrigger value='top-10'>🏆 Top 10 pokemons</TabsTrigger>
          <TabsTrigger value='stats'>📊 Statistic list</TabsTrigger>
        </TabsList>
      </div>
      <TabsContent value='top-10'>top 10 here</TabsContent>
      <TabsContent value='stats'>
        <StatisticListTab />
      </TabsContent>
    </Tabs>
  </>
);

export const Route = createLazyFileRoute('/_layout/stats/')({
  component: StatsPage
});
