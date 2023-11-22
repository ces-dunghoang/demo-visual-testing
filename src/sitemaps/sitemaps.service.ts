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
    const newUrl = this.urlsRepository.create(url);
    const savedUrl = await this.urlsRepository.save(newUrl);
    return savedUrl;
  }
  async getUrls() {
    const urls = await this.urlsRepository.find();
    return urls;
  }
  async getUrl(id: number) {
    const url = await this.urlsRepository.findOneBy({ id });
    if (url) {
      return url;
    }
    throw new HttpException('Url not found', HttpStatus.NOT_FOUND);
  }
  async extractLocValues(xmlData: any): Promise<Url[]> {
    const createdUrls: string[] = [];

    // Assuming xmlData is an object representing the parsed XML structure
    // You may need to adjust this based on the actual structure of your XML

    if (xmlData.urlset && xmlData.urlset.url) {
      const createdUrls: Url[] = [];
      if (xmlData.urlset && xmlData.urlset.url) {
        const urls = xmlData.urlset.url;
        if (Array.isArray(urls)) {
          // Multiple URLs
          for (const url of urls) {
            if (url.loc) {
              const createdUrl = url.loc.toString();
              const savedUrl = await this.createUrl({ url: createdUrl });
              createdUrls.push(savedUrl);
            }
          }
        } else if (urls.loc) {
          // Single URL
          const createdUrl = urls.loc.toString();
          const savedUrl = await this.createUrl({ url: createdUrl });
          createdUrls.push(savedUrl);
        }
      }
      return createdUrls;
    }
  }
}
