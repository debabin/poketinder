import { createFileRoute, Outlet } from '@tanstack/react-router';

import { BottomMenu, Header, Socials } from './-component';

const RootLayout = () => (
  <div className='container max-w-[1000px] m-auto'>
    <div className='flex flex-col h-full overflow-hidden'>
      <div className='container hidden lg:block'>
        <Header />
      </div>
      <main className='flex-1 px-4'>
        <Outlet />
      </main>
      <div className='lg:hidden'>
        <BottomMenu />
      </div>
    </div>
  </div>
);

export const Route = createFileRoute('/_layout')({
  component: RootLayout
});
