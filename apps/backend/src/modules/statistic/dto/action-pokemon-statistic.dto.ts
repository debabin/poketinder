import { ApiProperty } from '@nestjs/swagger';

export class ActionPokemonDto {
  @ApiProperty({ description: 'Pokemon id' })
  pokemonId: number;

  @ApiProperty({ description: 'User action' })
  action: 'pass' | 'smash';
}