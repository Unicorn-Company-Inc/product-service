import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CurrencyService {
  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
  ) {}

  async fetchConversionRates(): Promise<any> {
    interface Response {
      conversion_rates: any;
    }

    const token = this.configService.get('app.currencyApiToken');

    const response = await this.httpService
      .get<Response>(`https://v6.exchangerate-api.com/v6/${token}/latest/EUR`)
      .toPromise();
    return response.data.conversion_rates;
  }

  async convert(amount: number, to: string): Promise<number> {
    const rates = await this.fetchConversionRates();

    const rate = rates[to.toUpperCase()];
    if (!rate) throw new BadRequestException('Currency not found');

    return Math.round(amount * rate * 100) / 100;
  }
}
