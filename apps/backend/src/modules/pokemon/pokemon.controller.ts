import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { BaseResolver } from '@/shared';

import { PokemonService } from './pokemon.service';

import { PokemonResponse, PokemonsResponse } from './pokemon.model';

@ApiTags('pokemon')
@Controller('/pokemon')
export class PokemonController extends BaseResolver {
  constructor(private readonly pokemonService: PokemonService) {
    super();
  }

  @Get('/')
  @ApiOperation({ summary: 'get pokemons' })
  @ApiResponse({
    status: 200,
    description: 'pokemons',
    type: PokemonsResponse
  })
  async getPokemons(): Promise<PokemonsResponse> {
    const pokemons = await this.pokemonService.findAll();
    return this.wrapSuccess({ pokemons });
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
