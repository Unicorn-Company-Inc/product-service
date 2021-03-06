import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './entity/product.entity';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { StockModule } from 'src/stock/stock.module';
import { CurrencyModule } from 'src/currency/currency.module';
import { CalculatorModule } from 'src/calculator/calculator.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductEntity]),
    StockModule,
    CurrencyModule,
    CalculatorModule,
  ],
  providers: [ProductsService],
  controllers: [ProductsController],
})
export class ProductsModule {}
