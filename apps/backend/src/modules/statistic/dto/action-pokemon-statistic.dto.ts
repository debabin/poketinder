import { ApiProperty } from '@nestjs/swagger';
import { IsInt, Min, IsString, IsIn } from 'class-validator';

export class ActionPokemonDto {
  @ApiProperty({
    description: 'Pokemon ID (must be a positive integer)',
    example: 1
  })
  @IsInt({ message: 'Pokemon ID must be an integer' })
  @Min(1, { message: 'Pokemon ID must be a positive integer' })
  pokemonId: number;

  @ApiProperty({
    description: 'User action (either "pass" or "smash")',
    example: 'pass'
  })
  @IsString({ message: 'Action must be a string' })
  @IsIn(['pass', 'smash'], { message: 'Action must be either "pass" or "smash"' })
  action: 'pass' | 'smash';
}
