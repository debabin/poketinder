import { Module } from '@nestjs/common';

// import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StatisticModule } from './modules';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'admin',
      password: '1234',
      database: 'pokemon'
    }),
    StatisticModule
  ],
  controllers: [],
  providers: [AppService]
})
export class AppModule {}
