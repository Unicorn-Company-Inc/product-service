import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { StockService } from './stock.service';

@Module({
  imports: [HttpModule],
  providers: [StockService],
  exports: [StockService],
})
export class StockModule {}
