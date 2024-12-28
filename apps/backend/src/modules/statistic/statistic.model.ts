import { ApiProperty } from '@nestjs/swagger';

import { BaseResponse, PaginationResponse } from '@/shared';

import { PokemonStatistic, Statistic } from './entities';
import { Pokemon } from '../pokemon';

export class PokemonStatisticResponse extends BaseResponse {
  @ApiProperty({ description: 'Statistic', type: Statistic })
  statistic: Statistic;
}

export class TopPokemonsResponse extends BaseResponse {
  @ApiProperty({ description: 'Pokemon', type: [PokemonStatistic] })
  pokemons: PokemonStatistic[];
}

export class PaginationStatisticPokemonsResponse extends PaginationResponse {
  @ApiProperty({ description: 'Pokemon statistic', type: [PokemonStatistic] })
  pokemons: PokemonStatistic[];
}

export class StatisticPokemonsResponse extends BaseResponse {
  @ApiProperty({ description: 'Pokemons with pagination', type: PaginationStatisticPokemonsResponse })
  response: PaginationStatisticPokemonsResponse;
}

