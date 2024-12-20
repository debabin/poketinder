import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsArray, IsIn, IsOptional, IsString } from 'class-validator';

import { PaginationDto } from '@/shared';

export class GetPokemonDto extends PaginationDto {
  @ApiProperty({
    description: 'Filter pokemons by name (case-insensitive)',
    example: 'pikachu',
    required: false
  })
  @IsOptional()
  @IsString({ message: 'Name must be a string' })
  name?: string;

  @ApiProperty({
    isArray: true,
    description: 'Filter pokemons by type',
    example: ['electric', 'fire'],
    required: false
  })
  @Transform(({ value }) => {
    if (!Array.isArray(value)) return [value];
    return value;
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  types?: string[];

  @ApiProperty({
    description: 'Filter pokemons by raiting type (smash or pass)',
    example: 'raiting',
    enum: ['asc', 'desc'],
    required: false
  })
  @IsOptional()
  @IsString()
  @IsIn(['smash', 'pass'], { message: 'Raiting must be either "desc" or "acs"' })
  raiting?: 'asc' | 'desc';
}
