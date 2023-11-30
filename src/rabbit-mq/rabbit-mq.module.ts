import { Module } from '@nestjs/common';
import { RabbitMQSubscriber } from './rabbit-mq.subscriber';
import { RabbitMQPublisher } from './rabbit-mq.publisher';
import { VisualTestingModule } from 'src/visual-testing/visual-testing.module';

@Module({
  imports: [],
  providers: [RabbitMQPublisher, RabbitMQSubscriber],
  exports: [RabbitMQPublisher, RabbitMQSubscriber],
})
export class RabbitMqModule {}
