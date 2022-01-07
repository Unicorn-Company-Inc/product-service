import { HttpModule, HttpService } from '@nestjs/axios';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { StockEntity } from './entity/stock.entity';

@Injectable()
export class StockService {
  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
  ) {}
  async findOne(id: number): Promise<StockEntity | null> {
    try {
      const response = await this.httpService
        .get<StockEntity>(
          `${this.configService.get('app.storageUrl')}storage/stock/${id}`,
        )
        .toPromise();
      return response.data;
    } catch (error) {
      return null;
    }
  }
}
