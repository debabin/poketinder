import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Pokemon } from './entities';
import { PokemonController } from './pokemon.controller';
import { PokemonService } from './pokemon.service';

@Module({
  controllers: [PokemonController],
  imports: [TypeOrmModule.forFeature([Pokemon])],
  exports: [TypeOrmModule],
  providers: [PokemonService]
})
export class PokemonModule {}
