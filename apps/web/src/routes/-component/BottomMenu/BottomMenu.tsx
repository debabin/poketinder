import { Link } from '@tanstack/react-router';
import { BarChart, Home, Sword, User } from 'lucide-react';

import { cn } from '@/lib/utils';

import { PokeballIcon } from '../../../components/icons';

export const BottomMenu = () => (
  <div
    className={cn(
      'fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 flex justify-between items-center px-8 py-2'
    )}
  >
    <Link
      activeProps={{
        className: 'text-blue-500'
      }}
      inactiveProps={{
        className: 'text-gray-700'
      }}
      to='/'
    >
      <div className='flex flex-col items-center'>
        <Home className='size-6' />
        <span className='text-xs'>Smash</span>
      </div>
    </Link>

    <Link
      search={{
        limit: 10,
        offset: 0
      }}
      activeProps={{
        className: 'text-blue-500'
      }}
      inactiveProps={{
        className: 'text-gray-700'
      }}
      to='/stats/top'
    >
      <div className='flex flex-col items-center'>
        <BarChart className='size-6' />
        <span className='text-xs'>Stats</span>
      </div>
    </Link>

    <div className='flex items-center justify-center -mt-8 size-16 rounded-full shadow-lg'>
      <PokeballIcon />
    </div>

    <Link
      activeProps={{
        className: 'text-blue-500'
      }}
      inactiveProps={{
        className: 'text-gray-700'
      }}
      to='/'
    >
      <div className='flex flex-col items-center'>
        <Sword className='size-6 text-gray-700' />
        <span className='text-xs text-gray-600'>Fight</span>
      </div>
    </Link>

    <Link
      activeProps={{
        className: 'text-blue-500'
      }}
      inactiveProps={{
        className: 'text-gray-700'
      }}
      to='/'
    >
      <div className='flex flex-col items-center'>
        <User className='size-6 text-gray-700' />
        <span className='text-xs text-gray-600'>Profile</span>
      </div>
    </Link>
  </div>
);
