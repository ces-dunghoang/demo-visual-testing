// rabbit-mq/rabbit-mq.subscriber.ts
import { Injectable, OnModuleInit } from '@nestjs/common';
import * as amqp from 'amqplib';
import execComand from 'src/util/until';
import * as fs from 'fs';
import * as path from 'path';
import { RabbitMQPublisher } from './rabbit-mq.publisher';
@Injectable()
export class RabbitMQSubscriber implements OnModuleInit {
  private readonly url = process.env.RABBITMQ_URL;
  async onModuleInit(): Promise<void> {
    const connection = await amqp.connect(this.url);
    const channel = await connection.createChannel();

    const exchange = process.env.RABBITMQ_EXCHANGE; // Use the exchange name from your producer config
    await channel.assertExchange(exchange, 'topic', { durable: true });
    const queueName = process.env.RABBITMQ_QUEUE_NAME; // Use the queue name from your producer config
    const routingKey = process.env.RABBITMQ_ROUTING_KEY; // Use the routing key from your producer config

    const queue = await channel.assertQueue(queueName);

    await channel.bindQueue(queue.queue, exchange, routingKey);

    // Consume messages from the queue
    channel.consume(
      queue.queue,
      async (msg) => {
        if (msg) {
          const message = msg.content.toString();
          console.log(`Received message: ${message}`);
            //
          try {
            await execComand(); // Wait for visualTesting to complete
            console.log('ok');
            const rootFolder = path.join(__dirname, '..', '..', '..'); // Adjust based on the folder structure
            const snapshotFolder = path.join(
              rootFolder,
              'tests',
              'example.spec.ts-snapshots',
            );
            const imageFiles = fs.readdirSync(snapshotFolder);
            const rabbitMQPublisher = new RabbitMQPublisher();
            console.log('Generated images:', imageFiles);
          } catch (error) {
            console.error(`Error during visual testing: ${error}`);
          }
        }
      },
      { noAck: true },
    );
  }
}
