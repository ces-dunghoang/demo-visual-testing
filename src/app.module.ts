import { Module } from '@nestjs/common';
import { SitemapsModule } from './sitemaps/sitemaps.module';
import { ConfigModule } from '@nestjs/config';
import * as Joi from '@hapi/joi';
import { DatabaseModule } from './database/database.module';
import { RabbitMqModule } from './rabbit-mq/rabbit-mq.module';
import { VisualTestingModule } from './visual-testing/visual-testing.module';

@Module({
  imports: [
    SitemapsModule,
    RabbitMqModule,
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_DB: Joi.string().required(),
        PORT: Joi.number(),
        AWS_PUBLIC_BUCKET_NAME: Joi.string().required(),
      }),
    }),
    DatabaseModule,
    VisualTestingModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
