import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional } from 'class-validator';

export class GetTopPokemonsDto {
  @ApiProperty({
    description: 'Count of pokemons',
    example: 10,
    required: false
  })
  @IsOptional()
  @IsInt()
  count?: number;
}
