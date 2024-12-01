import type { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { BaseService } from '@/shared';

import { Pokemon } from './entities';

@Injectable()
export class PokemonService extends BaseService<Pokemon> {
  constructor(
    @InjectRepository(Pokemon)
    private readonly PokemonRepository: Repository<Pokemon>
  ) {
    super(PokemonRepository);
  }
}
