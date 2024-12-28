import type { SelectQueryBuilder } from 'typeorm';

import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

import { PokemonService } from '@/modules/pokemon';

import { BaseResolver, BaseResponse } from '@/shared';

import type { PokemonStatistic } from './entities';
import type { PaginationStatisticPokemonsResponse } from './statistic.model';
import { StatisticService } from './statistic.service';

import { ActionPokemonDto, GetPokemonsDto, GetPokemonStatisticDto, GetTopPokemonsDto } from './dto';
import { PokemonStatisticResponse, StatisticPokemonsResponse, TopPokemonsResponse } from './statistic.model';
import { RATING_QUERY } from './query';

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
  async getStatisticPokemons(@Query() getPokemonsDto: GetPokemonsDto): Promise<StatisticPokemonsResponse> {
    const pokemonQuery = (await this.pokemonService.createQueryBuilder('pokemon')).leftJoinAndMapOne(
      'pokemon.statistic',
      'statistic',
      'statistic',
      'statistic.pokemonId = pokemon.pokemonId',
    ) as SelectQueryBuilder<PokemonStatistic>

    const rating = getPokemonsDto.rating ?? 'desc';

    pokemonQuery.addSelect(RATING_QUERY, 'rating');

    pokemonQuery.addOrderBy('rating', rating.toUpperCase() as 'ASC' | 'DESC');
    pokemonQuery.addOrderBy('statistic.smash', rating.toUpperCase() as 'ASC' | 'DESC');


    if (getPokemonsDto.name) {
      pokemonQuery.where('pokemon.name ILIKE :name', { name: `%${getPokemonsDto.name}%` });
    }

    if (getPokemonsDto.types && Array.isArray(getPokemonsDto.types) && getPokemonsDto.types.length) {
      pokemonQuery.where('pokemon.types && :types', { types: getPokemonsDto.types });
    }

    pokemonQuery.skip(getPokemonsDto.offset).take(getPokemonsDto.limit);

    const [pokemons, itemCount] = await pokemonQuery.getManyAndCount();
    const pageCount = Math.ceil(itemCount / getPokemonsDto.limit);
    const page = Math.floor(getPokemonsDto.offset / getPokemonsDto.limit) + 1;
    const prev = page > 1;
    const next = page < pageCount;

    const response = {
      pokemons,
      offset: getPokemonsDto.offset,
      limit: getPokemonsDto.limit,
      itemCount,
      page,
      pageCount,
      prev,
      next
    } as PaginationStatisticPokemonsResponse;

    return this.wrapSuccess({ response });
  }

  @Get('/top')
  @ApiOperation({ summary: 'get pokemons' })
  @ApiQuery({
    name: 'count',
    required: false,
    type: Number,
    description: 'Filter pokemons by name'
  })
  @ApiResponse({
    status: 200,
    description: 'Top pokemons',
    type: TopPokemonsResponse
  })
  async getTopPokemons(@Query() getTopPokemonsDto: GetTopPokemonsDto): Promise<TopPokemonsResponse> {
    const { count = 10 } = getTopPokemonsDto;
    const pokemonQuery = (await this.pokemonService.createQueryBuilder('pokemon')).leftJoinAndMapOne(
      'pokemon.statistic',
      'statistic',
      'statistic',
      'statistic.pokemonId = pokemon.pokemonId',
    ) as SelectQueryBuilder<PokemonStatistic>

    pokemonQuery.addSelect(RATING_QUERY, 'rating');


    pokemonQuery.addOrderBy('rating', 'DESC');
    pokemonQuery.take(count);
    pokemonQuery.addOrderBy('statistic.smash', 'DESC');

    const pokemons = await pokemonQuery.getMany();

    return this.wrapSuccess({ pokemons });
  }

  @Get('/:pokemonId')
  @ApiOperation({ summary: 'get pokemon statistic' })
  @ApiParam({
    name: 'pokemonId',
    type: Number,
    description: 'pokemon id',
    example: '1'
  })
  @ApiResponse({
    status: 200,
    description: 'pokemon statistic',
    type: PokemonStatisticResponse
  })
  async getPokemonStatistic(
    @Param() getPokemonStatisticDto: GetPokemonStatisticDto
  ): Promise<PokemonStatisticResponse> {
    const statistic = await this.statisticService.findOne({
      where: { pokemonId: getPokemonStatisticDto.pokemonId }
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
