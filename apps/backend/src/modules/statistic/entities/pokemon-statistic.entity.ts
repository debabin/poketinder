import { ApiProperty } from '@nestjs/swagger';
import { Entity } from 'typeorm';

import { Pokemon } from '@/modules/pokemon/entities';

import type { Statistic } from './statistic.entity';

@Entity('pokemon_statistic')
export class PokemonStatistic extends Pokemon {
  @ApiProperty({ description: 'Pokemon statistic' })
  statistic: Statistic
}
