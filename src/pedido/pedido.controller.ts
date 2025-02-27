import { Body, Controller, Get, Param, ParseIntPipe, Post, Put, Delete, NotFoundException } from '@nestjs/common';
import { PedidoService } from './pedido.service';
import { Pedido } from './pedido.entity';
import { Detalle_Pedido } from 'src/detalle_pedido/detalle_pedido.entity';

@Controller('pedido')
export class PedidoController {
  constructor(private readonly pedidoService: PedidoService) {}

  @Get()
  async obtenerTodos(): Promise<Pedido[]> {
    return await this.pedidoService.findAll();
  }

  @Get(':id')
  async obtenerPorId(@Param('id', ParseIntPipe) id: number): Promise<Pedido> {
    return await this.pedidoService.findOne(id);
  }

  @Post()
  async crear(@Body() data: Partial<Pedido>): Promise<Pedido> {
    return await this.pedidoService.create(data);
  }

  @Put(':id')
  async actualizar(@Param('id', ParseIntPipe) id_pedido: number, @Body() data: Partial<Pedido>): Promise<Pedido> {
    return await this.pedidoService.update(id_pedido, data);
  }

  @Delete(':id')
  async eliminar(@Param('id', ParseIntPipe) id_pedido: number): Promise<void> {
    await this.pedidoService.delete(id_pedido);
  }

  // Ejemplo de endpoint para agregar un detalle
  @Post(':id/detalles')
  async agregarDetalle(@Param('id', ParseIntPipe) id_pedido: number, @Body() dataDetalle: Partial<Detalle_Pedido>): Promise<Pedido> {
    return await this.pedidoService.agregarDetalle(id_pedido, dataDetalle);
  }
}