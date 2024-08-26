import { wrapSuccess } from '../helpers';
import trpc from '../instance';

export const pokemonsRouter = trpc.router({
  hello: trpc.procedure.query(() => {
    return wrapSuccess([]);
  })
});
