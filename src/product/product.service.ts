import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Like, Repository } from 'typeorm';
import { Category } from 'src/category/entities/category.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const category = await this.categoryRepository.findOneBy({
      id: createProductDto.categoryId,
    });
    const product = this.productRepository.create({
      ...createProductDto,
      category: category,
    });
    return this.productRepository.save(product);
  }

  async findAll(
    page: number,
    limit: number,
    search: string,
  ): Promise<{ data: Product[]; total: number; totalPages: number }> {
    const [data, total] = await this.productRepository.findAndCount({
      relations: ['category'],
      where: search
        ? [{ name: Like(`%${search}%`) }, { description: Like(`%${search}%`) }]
        : undefined,
      skip: (page - 1) * limit,
      take: limit,
    });

    const totalPages = Math.ceil(total / limit);
    return { data, total, totalPages };
  }

  findOne(id: number): Promise<Product> {
    return this.productRepository.findOneBy({ id: id });
  }
}
