'use server';

import { orm } from '@/utils/database/instance';
import { todo } from '@/utils/database/schema';

export const addTodo = async (id: number, text: string) => {
  console.log('@@@@', id, text);
  await orm.insert(todo).values({
    id,
    text
  });
};

export const getData = async () => {
  const data = await orm.select().from(todo);
  return data;
};
