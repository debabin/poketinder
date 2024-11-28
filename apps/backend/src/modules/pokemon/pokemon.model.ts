import { ApiProperty } from '@nestjs/swagger';

import { BaseResponse } from '@/shared';

import { Pokemon } from './entities';

export class PokemonsResponse extends BaseResponse {
  @ApiProperty({ description: 'Покемоны', type: [Pokemon] })
  pokemons: Pokemon[];
}

export class PokemonResponse extends BaseResponse {
  @ApiProperty({ description: 'Покемон', type: Pokemon })
  pokemon: Pokemon;
}
