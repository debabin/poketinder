import type { Metadata } from 'next';
import { GithubIcon, HeartIcon } from 'lucide-react';
import Link from 'next/link';

import { LogoIcon } from '@/components/common/icons';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger
} from '@/components/ui';
import { getI18n, getMessagesByLocale } from '@/contexts/i18n/helpers';
import { ROUTES } from '@/utils/constants';

import { Providers } from './providers';

import './globals.css';

export const generateMetadata = async (): Promise<Metadata> => {
  const i18n = await getI18n('ru');

  return {
    title: i18n.formatMessage({ id: 'title' })
  };
};

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout = async ({ children }: RootLayoutProps) => {
  const messages = getMessagesByLocale('ru');

  // const todos = await getData();

  return (
    <html lang='en'>
      <Providers i18n={{ locale: 'ru', messages }}>
        <body className='container'>
          <header className='flex items-center justify-between h-15'>
            <div className='flex items-center justify-between gap-4'>
              <Link href='#' prefetch={false}>
                <LogoIcon className='size-6' />
                <span className='sr-only'>Acme Inc</span>
              </Link>

              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>Tinder</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className='grid gap-3 p-6 w-[500px] lg:grid-cols-[.75fr_1fr]'>
                        <li className='row-span-3'>
                          <NavigationMenuLink asChild>
                            <div className='flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-pink-300 to-fuchsia-100 p-6 no-underline outline-none focus:shadow-md'>
                              <HeartIcon className='size-6' />
                              <div className='mt-2 text-lg font-medium'>Smash or pass</div>
                              <p className='text-sm leading-tight'>
                                A game in which players evaluate the sexual desirability
                              </p>
                            </div>
                          </NavigationMenuLink>
                        </li>
                        <li>
                          <NavigationMenuLink asChild>
                            <Link
                              className='block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground'
                              href={ROUTES.HOME}
                            >
                              <div className='text-sm font-medium leading-none'>
                                Choose your poke
                              </div>
                              <p className='line-clamp-2 text-sm leading-snug text-muted-foreground'>
                                Choose your favorite pokemon
                              </p>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                        <li>
                          <NavigationMenuLink asChild>
                            <Link
                              className='block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground'
                              href='#'
                            >
                              <div className='text-sm font-medium leading-none'>Statistic</div>
                              <p className='line-clamp-2 text-sm leading-snug text-muted-foreground'>
                                Statistic of all pokemon matches
                              </p>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>Fightings</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className='grid w-[400px] gap-3 p-4 md:grid-cols-2'>
                        <li>
                          <NavigationMenuLink asChild>
                            <Link
                              className='block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground'
                              href='#'
                            >
                              <div className='text-sm font-medium leading-none'>Arena</div>
                              <p className='line-clamp-2 text-sm leading-snug text-muted-foreground'>
                                Choose your favorite pokemons and fight
                              </p>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                        <li>
                          <NavigationMenuLink asChild>
                            <Link
                              className='block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground'
                              href='#'
                            >
                              <div className='text-sm font-medium leading-none'>Pokemons</div>
                              <p className='line-clamp-2 text-sm leading-snug text-muted-foreground'>
                                Pokedex of pokemons with statistics
                              </p>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>

            <div className='flex items-center gap-4'>
              <Link className='text-muted-foreground hover:text-primary' href='#' prefetch={false}>
                <GithubIcon className='h-6 w-6' />
                <span className='sr-only'>GitHub</span>
              </Link>
              <Link className='text-muted-foreground hover:text-primary' href='#' prefetch={false}>
                asd
                <span className='sr-only'>Telegram</span>
              </Link>
            </div>
          </header>

          {children}
        </body>
      </Providers>
    </html>
  );
};

export default RootLayout;
