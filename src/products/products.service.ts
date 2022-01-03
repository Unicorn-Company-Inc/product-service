import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductEntity } from './entity/product.entity';
import { PRODUCTS_JSON } from 'src/constants';
import * as csv from 'fast-csv';
import * as fs from 'fs';
import { StockService } from 'src/stock/stock.service';
import { DetailedProductDto } from './dto/detailed-product.dto';
import { StockDto } from './dto/stock.dto';
import { CurrencyService } from 'src/currency/currency.service';

@Injectable()
export class ProductsService implements OnModuleInit {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepo: Repository<ProductEntity>,
    private stockService: StockService,
    private currencyService: CurrencyService,
  ) {}

  async onModuleInit() {
    const parsedProducts = JSON.parse(PRODUCTS_JSON);
    const products = parsedProducts.map((p) => {
      p.releaseDate = new Date(p.releaseDate);
      return p;
    });

    await this.productRepo.save(products);
  }

  async findAll(): Promise<ProductEntity[]> {
    return this.productRepo.find();
  }

  async exportProducts() {
    const products = await this.findAll();

    const csvStream = csv.format({ headers: true });
    csvStream.pipe(fs.createWriteStream('./temp/products.csv'));
    products.forEach((p) => csvStream.write(p));
    csvStream.end();
  }

  async findOne(id: number): Promise<ProductEntity> {
    const product = await this.productRepo.findOne(id);
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    return product;
  }

  async findDetailedProduct(
    id: number,
    currency = 'EUR',
  ): Promise<DetailedProductDto> {
    const product = await this.findOne(id);
    const stock = await this.stockService.findOne(id);
    if (!stock) {
      throw new NotFoundException(`Stock with id ${id} not found`);
    }

    const today = new Date();
    const estDelivery = new Date();
    estDelivery.setDate(today.getDate() + stock.deliveryTimeDays);

    const stockDto: StockDto = {
      estimatedDelivery: estDelivery,
      amount: stock.amount,
      id: stock.id,
    };

    const totalPrice = await this.currencyService.convert(
      stock.price,
      currency,
    );

    const detailedProductDto: DetailedProductDto = {
      price: totalPrice,
      currency,
      ...product,
      stock: stockDto,
    };

    return detailedProductDto;
  }
}
