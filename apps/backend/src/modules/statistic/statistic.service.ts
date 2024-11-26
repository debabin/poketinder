import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StatisticPokemon } from './entities';
import { BaseService } from '@/services';

@Injectable()
export class StatisticPokemonService extends BaseService<StatisticPokemon> {
  constructor(
    @InjectRepository(StatisticPokemon)
    private readonly StatisticPokemonRepository: Repository<StatisticPokemon>
  ) {
    super(StatisticPokemonRepository);
  }
}
