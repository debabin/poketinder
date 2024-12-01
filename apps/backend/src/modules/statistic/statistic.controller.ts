import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { BaseResolver } from '@/shared';

import { StatisticPokemonService } from './statistic.service';

import { StatisticPokemonResponse } from './statistic.model';

@ApiTags('statistic')
@Controller('/statistic')
export class StatisticController extends BaseResolver {
  constructor(private readonly statisticPokemonService: StatisticPokemonService) {
    super();
  }

  @Get('/:pokemonId')
  @ApiOperation({ summary: 'get pokemon statistic' })
  @ApiParam({
    name: 'pokemonId',
    type: String,
    description: 'pokemon id',
    example: '1'
  })
  @ApiResponse({
    status: 200,
    description: 'pokemon statistic',
    type: StatisticPokemonResponse
  })
  async getPokemonStatistic(
    @Param() getPokemonStatisticDto: { pokemonId: string }
  ): Promise<StatisticPokemonResponse> {
    const statistic = await this.statisticPokemonService.findOne({
      where: { pokemonId: Number(getPokemonStatisticDto.pokemonId) }
    });
    return this.wrapSuccess({ statistic });
  }
}
