import { Controller, Get } from '@nestjs/common';
import VisualTestingService from './visual-testing.service';

@Controller('visual-testing')
export default class VisualTestingController {
  constructor(private readonly visualTestingService: VisualTestingService) {}
  @Get()
  visualTesting() {
    return this.visualTestingService.visualTesting();
  }
}
