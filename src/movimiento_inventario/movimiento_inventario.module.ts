import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovimientoInventario } from './movimiento_inventario.entity';
import { MovimientoInventarioService } from './movimiento_inventario.service';
import { MovimientoInventarioController } from './movimiento_inventario.controller';
import { Producto } from 'src/producto/producto.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Producto, MovimientoInventario])],
  providers: [MovimientoInventarioService],
  controllers: [MovimientoInventarioController],
  exports: [MovimientoInventarioService]
})
export class MovimientoInventarioModule {}