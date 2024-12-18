import type { SelectQueryBuilder } from 'typeorm';

import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

import type { PokemonService } from '@/modules/pokemon';
import type { GetPokemonDto } from '@/modules/pokemon/dto';

import { BaseResolver, BaseResponse } from '@/shared';

import type { PokemonStatistic } from './entities';
import type {  PaginationStatisticPokemonsResponse} from './statistic.model';
import type { StatisticService } from './statistic.service';

import { ActionPokemonDto } from './dto';
import { PokemonStatisticResponse, StatisticPokemonsResponse } from './statistic.model';

@ApiTags('statistic')
@Controller('/statistic')
export class StatisticController extends BaseResolver {
  constructor(private readonly statisticService: StatisticService, private readonly pokemonService: PokemonService) {
    super();
  }

  @Get('/pokemons')
  @ApiOperation({ summary: 'get pokemons' })
  @ApiQuery({
    name: 'name',
    required: false,
    type: String,
    description: 'Filter pokemons by name'
  })
  @ApiQuery({
    name: 'types',
    required: false,
    type: String,
    description: 'Filter pokemons by type'
  })
  @ApiQuery({
    name: 'limit',
    required: true,
    type: Number,
    default: 10,
    description: 'Number of pokemons to return per page'
  })
  @ApiQuery({
    name: 'offset',
    required: true,
    type: Number,
    default: 0,
    description: 'Number of pokemons to skip'
  })
  @ApiResponse({
    status: 200,
    description: 'pokemons',
    type: StatisticPokemonsResponse
  })
  async getPokemons(@Query() getPokemonDto: GetPokemonDto): Promise<StatisticPokemonsResponse> {
    const pokemonQuery = (await this.pokemonService.createQueryBuilder('pokemon')).leftJoinAndMapOne(
      'pokemon.statistic',
      'statistic',
      'statistic',
      'statistic.pokemonId = pokemon.pokemonId',
    ) as SelectQueryBuilder<PokemonStatistic>

    const raiting = getPokemonDto.raiting ?? 'desc';

    pokemonQuery.addSelect(`
      CASE
         WHEN statistic.smash IS NULL AND statistic.pass IS NULL THEN 0
        ELSE (statistic.smash * 100) / (statistic.smash + statistic.pass)
      END
    `, 'raiting');

    pokemonQuery.orderBy('raiting', raiting.toUpperCase() as 'ASC' | 'DESC');
    
    if (getPokemonDto.name) {
      pokemonQuery.where('pokemon.name ILIKE :name', { name: `%${getPokemonDto.name}%` });
    }

    if (getPokemonDto.types && Array.isArray(getPokemonDto.types) && getPokemonDto.types.length) {
      pokemonQuery.where('pokemon.types && :types', { types: getPokemonDto.types });
    }

    pokemonQuery.skip(getPokemonDto.offset).take(getPokemonDto.limit);

    const [pokemons, itemCount] = await pokemonQuery.getManyAndCount();
    const pageCount = Math.ceil(itemCount / getPokemonDto.limit);
    const page = Math.floor(getPokemonDto.offset / getPokemonDto.limit) + 1;
    const prev = page > 1;
    const next = page < pageCount;

    const response = {
      pokemons,
      offset: getPokemonDto.offset,
      limit: getPokemonDto.limit,
      itemCount,
      page,
      pageCount,
      prev,
      next
    } as PaginationStatisticPokemonsResponse;

    return this.wrapSuccess({ response });
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
    type: PokemonStatisticResponse
  })
  async getPokemonStatistic(
    @Param() getPokemonStatisticDto: { pokemonId: string }
  ): Promise<PokemonStatisticResponse> {
    const statistic = await this.statisticService.findOne({
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
    const existedStatistic = await this.statisticService.findOne({
      where: { pokemonId: Number(actionPokemonStatisticDto.pokemonId) }
    });

    if (!existedStatistic) {
      await this.statisticService.insert({
        pokemonId: actionPokemonStatisticDto.pokemonId,
        pass: 0,
        smash: 0,
        [actionPokemonStatisticDto.action]: 1
      });

      return this.wrapSuccess();
    } else {
      await this.statisticService.save({
        ...existedStatistic,
        [actionPokemonStatisticDto.action]: existedStatistic[actionPokemonStatisticDto.action] + 1
      });

      return this.wrapSuccess();
    }
  }
}
