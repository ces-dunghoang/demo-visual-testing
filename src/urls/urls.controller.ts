import {
  Post,
  Controller,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import UrlsService from './urls.service';

@Controller('urls')
export default class UrlsController {
  constructor(private readonly urlsSerivce: UrlsService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
  }
}
