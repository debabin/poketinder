'use server';

import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

import { COOKIES } from '@/utils/constants';
import { orm } from '@/utils/database/instance';
import { statisticTable } from '@/utils/database/schema';

export const pokemonAction = async (pokemonId: number, action: 'pass' | 'smash') => {
  const statistic = await orm.query.statisticTable.findFirst({
    where: eq(statisticTable.pokemonId, pokemonId)
  });

  if (!statistic) {
    await orm.insert(statisticTable).values({
      pokemonId,
      pass: 0,
      smash: 0,
      [action]: 1
    });
  } else {
    await orm
      .update(statisticTable)
      .set({ [action]: statistic[action] + 1 })
      .where(eq(statisticTable.pokemonId, pokemonId));
  }

  (await cookies()).set(COOKIES.PREV_POKEMON_ID, String(pokemonId));

  revalidatePath('/');
};
