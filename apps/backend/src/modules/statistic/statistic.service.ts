import type { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { BaseService } from '@/shared';

import { StatisticPokemon } from './entities';

@Injectable()
export class StatisticPokemonService extends BaseService<StatisticPokemon> {
  constructor(
    @InjectRepository(StatisticPokemon)
    private readonly StatisticPokemonRepository: Repository<StatisticPokemon>
  ) {
    super(StatisticPokemonRepository);
  }
}
