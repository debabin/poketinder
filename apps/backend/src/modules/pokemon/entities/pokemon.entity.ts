import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('pokemon')
export class Pokemon {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({
    description: 'Уникальный идентификатор покемона',
    example: '1a2b3c4d-5678-90ef-gh12-3456789ijklm'
  })
  id: string;

  @Column({ name: 'pokemon_id', type: 'int', nullable: false })
  @ApiProperty({ description: 'ID покемона', example: 25 })
  pokemonId: number;

  @Column({ type: 'text', unique: true, nullable: false })
  @ApiProperty({
    description: 'URL изображения покемона',
    example: 'https://example.com/images/pikachu.png'
  })
  image: string;

  @Column({ type: 'text', unique: true, nullable: false })
  @ApiProperty({
    description: 'Имя покемона',
    example: 'Pikachu'
  })
  name: string;

  @Column({ type: 'text', nullable: false })
  @ApiProperty({
    description: 'Описание покемона',
    example: 'Покемон электрического типа. Может выпускать молнии из щек.'
  })
  description: string;

  @Column({ type: 'text', array: true, default: [], nullable: false })
  @ApiProperty({
    description: 'Список типов покемона',
    example: ['Electric'],
    isArray: true,
    type: String
  })
  types: string[];
}
