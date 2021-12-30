import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductEntity } from './entity/product.entity';
import { PRODUCTS_JSON } from 'src/constants';
import * as csv from 'fast-csv';
import * as fs from 'fs';

@Injectable()
export class ProductsService implements OnModuleInit {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepo: Repository<ProductEntity>,
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
}
