import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';


export class GetPokemonStatisticDto {
    @ApiProperty({
        description: 'Pokemon identifier',
        example: 1,
        required: true
    })
    @IsNumber()
    pokemonId: number;
}
