import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

import { BaseResolver } from '@/shared';

import { PokemonService } from './pokemon.service';

import { PaginationPokemonsResponse, PokemonResponse, PokemonsResponse } from './pokemon.model';
import { GetPokemonDto } from './dto';

@ApiTags('pokemon')
@Controller('/pokemon')
export class PokemonController extends BaseResolver {
  constructor(private readonly pokemonService: PokemonService) {
    super();
  }

  @Get('/')
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
    type: PokemonsResponse
  })
  async getPokemons(@Query() getPokemonDto: GetPokemonDto): Promise<PokemonsResponse> {
    const pokemonQuery = await this.pokemonService.createQueryBuilder('pokemon');

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
    } as PaginationPokemonsResponse;

    return this.wrapSuccess({ response });
  }

  @Get('/:pokemonId')
  @ApiOperation({ summary: 'get pokemon' })
  @ApiParam({
    name: 'pokemonId',
    type: String,
    description: 'pokemon id',
    example: '1'
  })
  @ApiResponse({
    status: 200,
    description: 'pokemon',
    type: PokemonResponse
  })
  async getPokemon(@Param() getPokemonDto: { pokemonId: string }): Promise<PokemonResponse> {
    const pokemon = await this.pokemonService.findOne({
      where: { pokemonId: Number(getPokemonDto.pokemonId) }
    });
    return this.wrapSuccess({ pokemon });
  }
}
