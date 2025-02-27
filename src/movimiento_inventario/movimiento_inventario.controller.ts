import { Body, Controller, Get, Param, ParseIntPipe, Post, Put, Delete, NotFoundException } from '@nestjs/common';
import { MovimientoInventarioService } from './movimiento_inventario.service';
import { MovimientoInventario } from './movimiento_inventario.entity';

@Controller('movimiento-inventario')
export class MovimientoInventarioController {
  constructor(private readonly movimientoInventarioService: MovimientoInventarioService) {}

  @Get()
  async obtenerTodos(): Promise<MovimientoInventario[]> {
    return await this.movimientoInventarioService.findAll();
  }

  @Get(':id')
  async obtenerPorId(@Param('id', ParseIntPipe) id: number): Promise<MovimientoInventario> {
    return await this.movimientoInventarioService.findOne(id);
  }

  @Post()
  async crear(@Body() data: Partial<MovimientoInventario>): Promise<MovimientoInventario> {
    return await this.movimientoInventarioService.create(data);
  }

  @Put(':id')
  async actualizar(@Param('id', ParseIntPipe) id_movimiento: number, @Body() data: Partial<MovimientoInventario>): Promise<MovimientoInventario> {
    return await this.movimientoInventarioService.update(id_movimiento, data);
  }

  @Delete(':id')
  async eliminar(@Param('id', ParseIntPipe) id_movimiento: number): Promise<void> {
    await this.movimientoInventarioService.delete(id_movimiento);
  }

  // Ejemplo de endpoint para agregar un movimiento a un producto
  @Post('producto/:id_producto')
  async agregarAMovimiento(@Param('id_producto', ParseIntPipe) id_producto: number, @Body() dataMovimiento: Partial<MovimientoInventario>): Promise<MovimientoInventario> {
    return await this.movimientoInventarioService.agregarAMovimiento(id_producto, dataMovimiento);
  }
}