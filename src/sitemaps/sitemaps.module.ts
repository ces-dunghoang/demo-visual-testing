import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Url from './urls.entity';
import SiteMapsController from './sitemaps.controller';
import SitemapsService from './sitemaps.service';

@Module({
  imports: [TypeOrmModule.forFeature([Url])],
  controllers: [SiteMapsController],
  providers: [SitemapsService],
})
export class SitemapsModule {}
