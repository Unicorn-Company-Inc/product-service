import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { StockService } from './stock.service';

@Module({
  imports: [HttpModule, ConfigModule],
  providers: [StockService],
  exports: [StockService],
})
export class StockModule {}
