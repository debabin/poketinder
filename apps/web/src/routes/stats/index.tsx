import { createFileRoute } from '@tanstack/react-router';
import { z } from 'zod';

import { POKEMONS_REQUESTS_PAGINATION } from './-constants';

const requestsSearchSchema = z.object({
  offset: z.number().catch(POKEMONS_REQUESTS_PAGINATION.OFFSET),
  limit: z.number().catch(POKEMONS_REQUESTS_PAGINATION.LIMIT)
});

export const Route = createFileRoute('/stats/')({
  validateSearch: requestsSearchSchema
});
