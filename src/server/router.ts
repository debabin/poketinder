import trpc from './instance';
import { pokemonsRouter } from './routes';

export const appRouter = trpc.mergeRouters(pokemonsRouter);
export const createCaller = trpc.createCallerFactory(appRouter);

export type AppRouter = typeof appRouter;
