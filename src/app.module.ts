import { Module } from '@nestjs/common';
import {ConfigModule, ConfigService} from '@nestjs/config';
import dbConfig from './config/config.database';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Restaurant } from './entity/restaurants.entity';
import { CatalogModule } from './catalog/catalog.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    CatalogModule,
    ThrottlerModule.forRoot([{
      ttl: 60,
      limit: 10,
    }]),
    TypeOrmModule.forFeature([Restaurant]),
    ConfigModule.forRoot({ isGlobal: true, load: [dbConfig] }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('database.host'),
        port: +configService.get<number>('database.port'),
        username: configService.get('database.username'),
        password: configService.get('database.password'),
        database: configService.get('database.database'),
        autoLoadEntities: configService.get('database.auto_load_entities'),
        enities: configService.get('database.entities'),
        synchronize: configService.get('database.synchronize'),
      }),
    })
  ],
  providers: [{
      provide: APP_GUARD,
      useClass: ThrottlerGuard
  }],
})

export class AppModule {}