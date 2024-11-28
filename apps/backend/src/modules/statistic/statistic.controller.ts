import { BaseResolver } from '@/shared';
import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { StatisticPokemonResponse } from './statistic.model';
import { StatisticPokemonService } from './statistic.service';

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
