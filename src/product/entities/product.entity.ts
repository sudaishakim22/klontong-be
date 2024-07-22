import { Category } from 'src/category/entities/category.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 40 })
  sku: string;

  @Column({ type: 'varchar', length: 40 })
  name: string;

  @Column({ type: 'varchar', length: 100 })
  description: string;

  @Column({ type: 'float' })
  weight: number;

  @Column({ type: 'float' })
  width: number;

  @Column({ type: 'float' })
  length: number;

  @Column({ type: 'float' })
  height: number;

  @Column({ type: 'varchar' })
  image: string;

  @Column({ type: 'int' })
  price: number;

  @ManyToOne(() => Category, (category) => category.products)
  category: Category;
}
