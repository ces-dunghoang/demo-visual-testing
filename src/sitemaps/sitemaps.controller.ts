import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import SitemapsService from './sitemaps.service';
import { FileInterceptor } from '@nestjs/platform-express';
import * as xml2js from 'xml2js';
import { promisify } from 'util';
@Controller('sitemaps')
export default class SiteMapsController {
  constructor(private readonly sitemapsService: SitemapsService) {}
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const parseStringAsync = promisify(xml2js.parseString);

    try {
      const xmlData = await parseStringAsync(file.buffer.toString());
      const locValues = this.sitemapsService.extractLocValues(xmlData);
      return this.sitemapsService.getUrls();
    } catch (error) {
      console.error('Error parsing XML:', error);
      throw error;
    }
  }
}
