import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import CreateUrlDto from './dto/createUrl.dto';
import Url from './urls.entity';
import UpdatePostDto from './dto/updatePost.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export default class SitemapsService {
  constructor(
    @InjectRepository(Url)
    private urlsRepository: Repository<Url>,
  ) {}
  async createUrl(url: CreateUrlDto) {
    const newPost = await this.urlsRepository.create(url);
    await this.urlsRepository.save(newPost);
    return newPost;
  }
  async getUrls() {
    const urls = await this.urlsRepository.find();
    return urls;
  }
  extractLocValues(xmlData: any): void {
    // Assuming xmlData is an object representing the parsed XML structure
    // You may need to adjust this based on the actual structure of your XML

    if (xmlData.urlset && xmlData.urlset.url) {
      const urls = xmlData.urlset.url;

      if (Array.isArray(urls)) {
        // Multiple URLs
        urls.forEach((url: any) => {
          if (url.loc) {
            this.createUrl({ url: url.loc });
          }
        });
      } else if (urls.loc) {
        // Single URL
        this.createUrl({ url: urls.loc });
      }
    }
  }
}