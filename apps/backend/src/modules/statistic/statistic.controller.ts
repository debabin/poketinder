import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { BaseResolver, BaseResponse } from '@/shared';

import { StatisticPokemonService } from './statistic.service';

import { StatisticPokemonResponse } from './statistic.model';
import { ActionPokemonDto } from './dto';

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

  @Post('/action')
  @ApiOperation({ summary: 'create pokemon statistic' })
  @ApiBody({ type: ActionPokemonDto })
  @ApiResponse({
    status: 200,
    description: 'create pokemon statistic status',
    type: BaseResponse
  })
  async actionPokemonStatistic(
    @Body() actionPokemonStatisticDto: { pokemonId: number; action: 'pass' | 'smash' }
  ): Promise<BaseResponse> {
    const existedStatistic = await this.statisticPokemonService.findOne({
      where: { pokemonId: Number(actionPokemonStatisticDto.pokemonId) }
    });

    if (!existedStatistic) {
      await this.statisticPokemonService.insert({
        pokemonId: actionPokemonStatisticDto.pokemonId,
        pass: 0,
        smash: 0,
        [actionPokemonStatisticDto.action]: 1
      });

      return this.wrapSuccess();
    } else {
      await this.statisticPokemonService.save({
        ...existedStatistic,
        [actionPokemonStatisticDto.action]: existedStatistic[actionPokemonStatisticDto.action] + 1
      });

      return this.wrapSuccess();
    }
  }
}
