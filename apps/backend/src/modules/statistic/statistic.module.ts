import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Pokemon, PokemonService } from '@/modules/pokemon';

import { Statistic } from './entities';
import { StatisticController } from './statistic.controller';
import { StatisticService } from './statistic.service';

@Module({
  controllers: [StatisticController],
  imports: [TypeOrmModule.forFeature([Statistic, Pokemon])],
  exports: [TypeOrmModule],
  providers: [StatisticService, PokemonService]
})
export class StatisticModule {}
