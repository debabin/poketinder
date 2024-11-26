import { ApiProperty } from '@nestjs/swagger';

import { BaseResponse } from '@/services';

import { StatisticPokemon } from './entities';

export class StatisticPokemonResponse extends BaseResponse {
  @ApiProperty({ description: 'Статистика покемона', type: StatisticPokemon })
  statistic: StatisticPokemon;
}
