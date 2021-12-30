import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('products')
export class ProductEntity {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  color: string;

  @Column()
  category: string;

  @Column()
  description: string;

  @Column()
  manufacturer: string;

  @Column({ type: 'date' })
  releaseDate: Date;

  @Column()
  stars: number;
}
