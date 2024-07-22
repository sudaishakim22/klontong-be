import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { AppConfigModule } from './config/app-config.module';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { Category } from './category/entities/category.entity';
import { Product } from './product/entities/product.entity';

const typeOrmModule = TypeOrmModule.forRoot({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  password: '',
  username: 'postgres',
  entities: [User, Category, Product],
  database: 'test_brik_be_db',
  synchronize: true,
  logging: true,
});

@Module({
  imports: [
    typeOrmModule,
    UserModule,
    AppConfigModule,
    AuthModule,
    CategoryModule,
    ProductModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
