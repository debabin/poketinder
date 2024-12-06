import { PaginationDto } from '@/shared';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsArray, IsOptional, IsString } from 'class-validator';

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
}
