import { HttpModule, HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { StockEntity } from './entity/stock.entity';

@Injectable()
export class StockService {
  constructor(private httpService: HttpService) {}
  async findOne(id: number): Promise<StockEntity> {
    const response = await this.httpService
      .get<StockEntity>(`http://localhost:3002/storage/stock/${id}`)
      .toPromise();
    return response.data;
  }
}
