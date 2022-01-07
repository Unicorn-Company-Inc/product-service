import { AmqpConnection, RabbitRPC } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CalculatorService {
  constructor(private readonly amqpConnection: AmqpConnection) {}

  async invokeCalculateMwst(price: number): Promise<number> {
    const response = await this.amqpConnection.request<number>({
      exchange: 'mwst',
      routingKey: 'rpc',
      payload: price,
      timeout: 10000,
    });
    return response;
  }
}
