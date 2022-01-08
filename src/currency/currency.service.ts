import { HttpService } from '@nestjs/axios';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ISetupCache, setupCache } from 'axios-cache-adapter';

@Injectable()
export class CurrencyService {
  cache: ISetupCache;

  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
  ) {
    this.cache = setupCache({
      maxAge: 24 * 60 * 60 * 1000,
    });
  }

  async fetchConversionRates(): Promise<any> {
    interface Response {
      conversion_rates: any;
    }

    const token = this.configService.get('app.currencyApiToken');
    const config = { adapter: this.cache.adapter };

    try {
      const response = await this.httpService
        .get<Response>(
          `https://v6.exchangerate-api.com/v6/${token}/latest/EUR`,
          config,
        )
        .toPromise();
      return response.data.conversion_rates;
    } catch (error) {
      throw new InternalServerErrorException('Could not fetch currency rates');
    }
  }

  async convert(amount: number, to: string): Promise<number> {
    const rates = await this.fetchConversionRates();

    const rate = rates[to.toUpperCase()];
    if (!rate) throw new BadRequestException('Currency not found');

    return Math.round(amount * rate * 100) / 100;
  }
}
