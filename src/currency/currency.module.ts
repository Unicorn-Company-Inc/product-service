import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CurrencyService } from './currency.service';

@Module({
  imports: [HttpModule, ConfigModule],
  providers: [CurrencyService],
  exports: [CurrencyService],
})
export class CurrencyModule {}
