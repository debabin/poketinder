'use server';

import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { orm } from '@/utils/database/instance';
import { statisticTable } from '@/utils/database/schema';

export const pokemonAction = async (id: number, action: 'pass' | 'smash') => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const [pokemon] = await orm.select()
    .from(statisticTable)
    .where(eq(statisticTable.pokemonId, id));

  await orm.update(statisticTable).set({ [action]: pokemon[action] + 1 }).where(eq(statisticTable.pokemonId, id));
  revalidatePath('/');
};
