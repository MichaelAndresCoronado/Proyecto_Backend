import { Body, Controller, Get, Param, ParseIntPipe, Post, Put, Delete, NotFoundException } from '@nestjs/common';
import { Detalle_PedidoService } from '../detalle_pedido/detalle_pedido.service';
import { Detalle_Pedido } from '../detalle_pedido/detalle_pedido.entity';

@Controller('detalle-pedido')
export class Detalle_PedidoController {
  constructor(private readonly detallePedidoService: Detalle_PedidoService) {}

  @Get()
  async obtenerTodos(): Promise<Detalle_Pedido[]> {
    return await this.detallePedidoService.findAll();
  }

  @Get(':id')
  async obtenerPorId(@Param('id', ParseIntPipe) id: number): Promise<Detalle_Pedido> {
    return await this.detallePedidoService.findOne(id);
  }

  @Post()
  async crear(@Body() data: Partial<Detalle_Pedido>): Promise<Detalle_Pedido> {
    return await this.detallePedidoService.create(data);
  }

  @Put(':id')
  async actualizar(@Param('id', ParseIntPipe) id_detalle_pedido: number, @Body() data: Partial<Detalle_Pedido>): Promise<Detalle_Pedido> {
    return await this.detallePedidoService.update(id_detalle_pedido, data);
  }

  @Delete(':id')
  async eliminar(@Param('id', ParseIntPipe) id_detalle_pedido: number): Promise<void> {
    await this.detallePedidoService.delete(id_detalle_pedido);
  }

  // Ejemplo de endpoint para agregar un detalle a un pedido
  @Post('pedido/:id_pedido')
  async agregarADetalle(@Param('id_pedido', ParseIntPipe) id_pedido: number, @Body() dataDetalle: Partial<Detalle_Pedido>): Promise<Detalle_Pedido> {
    return await this.detallePedidoService.agregarADetalle(id_pedido, dataDetalle);
  }
}