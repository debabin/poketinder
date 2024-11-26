import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class StatisticPokemon {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'Индефикатор статистики покемона', example: 23749234 })
  id: number;

  @Column({ type: 'number', unique: true })
  @ApiProperty({ description: 'Индефикатор покемона', example: 1 })
  pokemonId: number;

  @Column({ type: 'number', default: 0 })
  @ApiProperty({ description: 'Лайки', example: 12 })
  smash: number;

  @Column({ type: 'number', default: 0 })
  @ApiProperty({ description: 'Дизлайки', example: 7 })
  pass: number;
}
