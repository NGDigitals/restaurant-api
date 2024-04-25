import { Module } from '@nestjs/common';
import setupSwagger from './catalog.swagger';
import { MainModule } from '../main/main.module';
import { MainController } from '../main/main.controller';

@Module({
    controllers: [MainController],
    imports: [MainModule],
})

export class CatalogModule {}
setupSwagger(CatalogModule);