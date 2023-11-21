import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Url from './urls.entity';
import SiteMapsController from './sitemaps.controller';
import SitemapsService from './sitemaps.service';
import { S3Module } from 'src/AWS-S3/s3.module';

@Module({
  imports: [TypeOrmModule.forFeature([Url]), S3Module],
  controllers: [SiteMapsController],
  providers: [SitemapsService],
})
export class SitemapsModule {}
