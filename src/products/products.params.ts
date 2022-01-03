import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class ProductParams {
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  id: number;
}

export class ProductQuery {
  @IsString()
  @IsOptional()
  currency: string;
}
