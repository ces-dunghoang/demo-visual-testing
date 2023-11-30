import { Module } from '@nestjs/common';
import VisualTestingController from './visual-testing.controller';
import VisualTestingService from './visual-testing.service';
import { RabbitMqModule } from 'src/rabbit-mq/rabbit-mq.module';

@Module({
  imports: [RabbitMqModule],
  controllers: [VisualTestingController],
  providers: [VisualTestingService],
})
export class VisualTestingModule {}
