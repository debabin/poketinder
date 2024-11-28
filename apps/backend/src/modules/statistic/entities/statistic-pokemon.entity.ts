import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class StatisticPokemon {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({
    description: 'Уникальный идентификатор статистики',
    example: '1a2b3c4d-5678-90ef-gh12-3456789ijklm'
  })
  id: string;

  @Column({ type: 'int', unique: true, nullable: false })
  @ApiProperty({ description: 'Идентификатор покемона', example: 1 })
  pokemonId: number;

  @Column({ type: 'int', default: 0, nullable: false })
  @ApiProperty({ description: 'Лайки', example: 12 })
  smash: number;

  @Column({ type: 'int', default: 0, nullable: false })
  @ApiProperty({ description: 'Дизлайки', example: 7 })
  pass: number;
}
