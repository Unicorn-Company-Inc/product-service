import { StockDto } from './stock.dto';

export class DetailedProductDto {
  id: number;

  name: string;

  price: number;

  currency: string;

  color: string;

  category: string;

  description: string;

  manufacturer: string;

  releaseDate: Date;

  stars: number;

  stock: StockDto;
}
