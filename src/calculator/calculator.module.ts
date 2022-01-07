import { RabbitMQConfig, RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CalculatorService } from './calculator.service';

@Module({
  imports: [
    RabbitMQModule.forRootAsync(RabbitMQModule, {
      imports: [ConfigModule],
      useFactory: (configService: ConfigService): RabbitMQConfig => ({
        exchanges: [
          {
            name: 'mwst',
            type: 'topic',
          },
        ],
        uri: configService.get('app.rabbitmqUrl'),
        connectionInitOptions: { wait: false },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [CalculatorService],
  exports: [CalculatorService],
})
export class CalculatorModule {}
