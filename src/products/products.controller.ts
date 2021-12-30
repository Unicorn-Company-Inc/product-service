import { Controller, Get } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get('export')
  exportProducts() {
    this.productsService.exportProducts();
    return 'File exported to ./temp/products.csv';
  }
}
