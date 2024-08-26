import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { getI18n, getMessagesByLocale } from '@/contexts/i18n/helpers';
import { pokeApi } from '@/utils/api/instance';

import type { Pokemon } from '../generated/api/models';

import { getData } from './actions';
import { Providers } from './providers';

import './globals.css';

const inter = Inter({ subsets: ['latin'] });

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
  const pokemon = await pokeApi.get<Pokemon>('pokemon/ditto', { cache: 'force-cache' });

  const todos = await getData();

  return (
    <html lang='en'>
      <Providers i18n={{ locale: 'ru', messages }}>

        <body className={inter.className}>{pokemon.name} {children}

          <div>
            {todos.map((todo) => <div key={todo.id}>{todo.text}</div>)}
          </div>
        </body>
      </Providers>

    </html>
  );
};

export default RootLayout;
