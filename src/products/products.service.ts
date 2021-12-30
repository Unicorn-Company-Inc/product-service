import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductEntity } from './entity/product.entity';
import * as fs from 'fs';
import { PRODUCTS_JSON } from 'src/constants';

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
}
