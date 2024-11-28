import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pokemon } from './entities';
import { BaseService } from '@/shared';

@Injectable()
export class PokemonService extends BaseService<Pokemon> {
  constructor(
    @InjectRepository(Pokemon)
    private readonly PokemonRepository: Repository<Pokemon>
  ) {
    super(PokemonRepository);
  }
}
