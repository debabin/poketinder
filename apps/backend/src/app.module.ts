import { Module } from '@nestjs/common';

// import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StatisticModule } from './modules';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PokemonModule, PokemonService } from './modules/pokemon';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'admin',
      password: '1234',
      database: 'pokemon',
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      synchronize: true
    }),
    StatisticModule,
    PokemonModule
  ],
  controllers: [],
  providers: [AppService, PokemonService]
})
export class AppModule {}
