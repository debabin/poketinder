import { Coffee, Github, Twitch } from 'lucide-react';

import {
  buttonVariants,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui';
import { cn } from '@/lib/utils';

export const Socials = () => (
  <div className='absolute right-2 top-24 lg:right-6 lg:top-0 lg:bottom-0 flex items-center z-30'>
    <div className='flex flex-col gap-4'>
      <a
        href='https://github.com/debabin/poketinder'
        className={cn(
          buttonVariants({ size: 'icon' }),
          'bg-gradient-to-r from-gray-700 to-black text-white'
        )}
        rel='noreferrer'
        target='_blank'
      >
        <Github className='size-5' />
      </a>

      <a
        href='https://www.twitch.tv/siberiacancode'
        className={cn(
          buttonVariants({ size: 'icon' }),
          'bg-gradient-to-r from-purple-500 to-indigo-600 text-white'
        )}
        rel='noreferrer'
        target='_blank'
      >
        <Twitch className='size-5' />
      </a>

      <TooltipProvider delayDuration={2000}>
        <Tooltip defaultOpen>
          <TooltipTrigger>
            <a
              href='https://boosty.to/siberiacancode'
              className={cn(
                buttonVariants({ size: 'icon' }),
                'bg-gradient-to-r from-yellow-500 to-orange-600 text-white'
              )}
              rel='noreferrer'
              target='_blank'
            >
              <Coffee className='size-5' />
            </a>
          </TooltipTrigger>
          <TooltipContent side='left'>
            <span>Support me on Boosty!</span>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  </div>
);
