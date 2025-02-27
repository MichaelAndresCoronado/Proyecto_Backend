import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Categoria } from './categoria.entity';
import { CategoriaService } from './categoria.service';
import { CategoriaController } from './categoria.controller';
import { Producto } from 'src/producto/producto.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Producto, Categoria])],
  providers: [CategoriaService],
  controllers: [CategoriaController],
  exports: [CategoriaService]
})
export class CategoriaModule {}