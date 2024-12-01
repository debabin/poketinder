import { createFileRoute } from '@tanstack/react-router';

import { ROUTES } from '@/utils';
import { getPokemonOptions } from '@/utils/api/options';
import { getRandomPokemonId } from '@/utils/helpers';

export const Route = createFileRoute(ROUTES.MAIN)({
  loader: async ({ context: { queryClient } }) => {
    const randomPokemonId = getRandomPokemonId();
    await queryClient.ensureQueryData(
      getPokemonOptions({ params: { pokemonId: randomPokemonId } })
    );
  }
});
