import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Url from './urls.model';
import { Injectable } from '@nestjs/common';

@Injectable()
export default class UrlsService {
  constructor(
    @InjectRepository(Url)
    private urlsRepository: Repository<Url>,
  ) {}

  getAllUrls() {
    return this.urlsRepository.find();
  }
}
