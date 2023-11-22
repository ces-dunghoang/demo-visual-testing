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
import { get } from 'http';
import { chromium } from 'playwright';
import { S3Service } from 'src/AWS-S3/s3.service';
import { v2 as cloudinary } from 'cloudinary';
import * as dotenv from 'dotenv';
import { log } from 'console';
import { v4 as uuid } from 'uuid';
import Url from './urls.entity';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
@Controller('sitemaps')
export default class SiteMapsController {
  constructor(
    private readonly sitemapsService: SitemapsService,
    private s3Service: S3Service,
  ) {}
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

  @Get(':id')
  async getUrls(@Param('id') id: number) {
    return this.sitemapsService.getUrl(id);
  }

  @Get('takescreenshot/:id')
  async takeScreenshot(
    @Param('id') id: number,
  ): Promise<{ url: Url; screenshotUrl: string }> {
    const urlModel = await this.sitemapsService.getUrl(id);
    const url = urlModel.url;
    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.goto(url);
    const screenshotPath = `screenshots/${uuid()}/${url}.png`;
    await page.screenshot({
      path: screenshotPath,
      fullPage: true,
    });
    await browser.close();
    const cloudinaryUploadResult = await cloudinary.uploader.upload(
      screenshotPath,
      {
        folder: 'my-web-archive',
      },
    );

    // fs.unlinkSync(screenshotPath);

    return { url: urlModel, screenshotUrl: cloudinaryUploadResult.url };
    //  const uploadResult = await this.s3Service.uploadImage(screenshotPath);
  }
}
