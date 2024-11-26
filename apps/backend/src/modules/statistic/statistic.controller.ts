import { BaseResolver } from '@/services';
import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { StatisticPokemonResponse } from './statistic.model';
import { StatisticPokemonService } from './statistic.service';

@ApiTags('statistic')
@Controller('/statistic')
export class StatisticController extends BaseResolver {
  constructor(
    private readonly statisticPokemonService: StatisticPokemonService
  ) {
    super();
  }

  @Get('/:pokemonId')
  @ApiOperation({ summary: 'получить пункты выдачи' })
  @ApiResponse({
    status: 200,
    description: 'points',
    type: StatisticPokemonResponse
  })
  async getPokemonStatistic(
    @Param() getPokemonStatisticDto: { pokemonId: string }
  ): Promise<StatisticPokemonResponse> {
    console.log('@getPokemonStatisticDto', getPokemonStatisticDto);
    const statistic = await this.statisticPokemonService.findOne({ where: { pokemonId: Number(getPokemonStatisticDto.pokemonId) }})
    return this.wrapSuccess({ statistic });
  }
}
