import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { StatisticPokemon } from './entities';
import { StatisticController } from './statistic.controller';
import { StatisticPokemonService } from './statistic.service';

@Module({
  controllers: [StatisticController],
  imports: [TypeOrmModule.forFeature([StatisticPokemon])],
  exports: [TypeOrmModule],
  providers: [StatisticPokemonService]
})
export class StatisticModule {}