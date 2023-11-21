import { Module } from '@nestjs/common';
import UrlsController from './urls.controller';
import Url from './urls.model';
import UrlsService from './urls.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Url])],
  controllers: [UrlsController],
  providers: [UrlsService],
})
export class UrlsModule {}
