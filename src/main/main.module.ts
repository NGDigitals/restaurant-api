import { Module } from '@nestjs/common';
import { MainController } from './main.controller';
import { MainService } from './main.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Restaurant } from '../entity/restaurants.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Restaurant])],
  providers: [MainService],
  exports: [MainService],
  controllers: [MainController]
})

export class MainModule {}