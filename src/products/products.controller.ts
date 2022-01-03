import { Controller, Get, Param } from '@nestjs/common';
import { DetailedProductDto } from './dto/detailed-product.dto';
import { ProductEntity } from './entity/product.entity';
import { ProductParams } from './products.params';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get('export')
  exportProducts() {
    this.productsService.exportProducts();
    return 'File exported to ./temp/products.csv';
  }

  @Get()
  findAll(): Promise<ProductEntity[]> {
    return this.productsService.findAll();
  }

  @Get(':id/details')
  findDetailedProduct(
    @Param() params: ProductParams,
  ): Promise<DetailedProductDto> {
    return this.productsService.findDetailedProduct(params.id);
  }

  @Get(':id')
  findOne(@Param() params: ProductParams): Promise<ProductEntity> {
    return this.productsService.findOne(params.id);
  }
}
