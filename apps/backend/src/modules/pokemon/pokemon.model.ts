import { ApiProperty } from '@nestjs/swagger';

import { BaseResponse } from '@/shared';

import { Pokemon } from './entities';

export class PokemonResponse extends BaseResponse {
  @ApiProperty({ description: 'Pokemon', type: Pokemon })
  pokemon: Pokemon;
}
