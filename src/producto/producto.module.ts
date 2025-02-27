import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Producto } from './producto.entity';
import { ProductoService } from './producto.service';
import { ProductoController } from './producto.controller';
import { AlertaStock } from 'src/alerta-stock/alerta-stock.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Producto, AlertaStock])],
  providers: [ProductoService],
  controllers: [ProductoController],
  exports: [ProductoService],
})
export class ProductoModule {}