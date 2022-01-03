import { Type } from 'class-transformer';
import { IsNumber, Min } from 'class-validator';

export class ProductParams {
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  id: number;
}
