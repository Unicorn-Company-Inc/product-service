import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import dbConfig from './config/db.config';
import appConfig from './config/app.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './products/products.module';
import { StockModule } from './stock/stock.module';
import { CurrencyModule } from './currency/currency.module';
import { CalculatorModule } from './calculator/calculator.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('development', 'ci', 'staging', 'production', 'demo')
          .default('development'),
        PORT: Joi.number().default(3000),
        DATABASE_HOST: Joi.string().required(),
        DATABASE_PORT: Joi.number().required(),
        DATABASE_USERNAME: Joi.string().required(),
        DATABASE_PASSWORD: Joi.string().required(),
        DATABASE_DATABASE: Joi.string().required(),
        DATABASE_SSL: Joi.boolean().default(true),
        DATABASE_SYNCHRONIZE: Joi.boolean().default(false),
        RABBITMQ_URL: Joi.string().uri().required(),
        CURRENCY_API_TOKEN: Joi.string().required(),
        STORAGE_URL: Joi.string().uri().required(),
      }),
      load: [dbConfig, appConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        ...configService.get('database'),
      }),
      inject: [ConfigService],
    }),
    ProductsModule,
    StockModule,
    CurrencyModule,
    CalculatorModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
