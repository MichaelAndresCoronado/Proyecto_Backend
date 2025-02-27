import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pedido } from './pedido.entity';
import { PedidoService } from './pedido.service';
import { PedidoController } from './pedido.controller';
import { Detalle_Pedido } from 'src/detalle_pedido/detalle_pedido.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Pedido, Detalle_Pedido ])],
  providers: [PedidoService],
  controllers: [PedidoController],
  exports: [PedidoService] // 
})
export class PedidoModule {}