import { createFileRoute, Outlet } from '@tanstack/react-router';

import { BottomMenu } from './-component';
import { Header } from './-component/Header/Header';

const RootLayout = () => {
  return (
    <div className='flex flex-col h-full overflow-hidden'>
      <div>
        <Header />
      </div>
      <div className='flex-1'>
        <Outlet />
      </div>
      <div>
        <BottomMenu />
      </div>
    </div>
  );
};

export const Route = createFileRoute('/_layout')({
  component: RootLayout
});
