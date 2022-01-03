import { StockDto } from './stock.dto';

export class DetailedProductDto {
  id: number;

  name: string;

  color: string;

  category: string;

  description: string;

  manufacturer: string;

  releaseDate: Date;

  stars: number;

  price: number;

  stock: StockDto;
}
