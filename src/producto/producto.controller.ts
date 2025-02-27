import { Body, Controller, Get, Param, ParseIntPipe, Post, Put, Delete, NotFoundException } from '@nestjs/common';
import { ProductoService } from './producto.service';
import { Producto } from './producto.entity';
import { AlertaStock } from 'src/alerta-stock/alerta-stock.entity';

@Controller('producto')
export class ProductoController {
  constructor(private readonly productoService: ProductoService) {}

  @Get()
  async obtenerTodos(): Promise<Producto[]> {
    return await this.productoService.findAll();
  }

  @Get(':id')
  async obtenerPorId(@Param('id', ParseIntPipe) id: number): Promise<Producto> {
    return await this.productoService.findOne(id);
  }

  @Post()
  async crear(@Body() data: Partial<Producto>): Promise<Producto> {
    return await this.productoService.create(data);
  }

  @Put(':id')
  async actualizar(@Param('id', ParseIntPipe) id_producto: number, @Body() data: Partial<Producto>): Promise<Producto> {
    return await this.productoService.update(id_producto, data);
  }

  @Delete(':id')
  async eliminar(@Param('id', ParseIntPipe) id_producto: number): Promise<void> {
    await this.productoService.delete(id_producto);
  }

  // Ejemplo de endpoint para agregar una alerta
  @Post(':id/alertas')
  async agregarAlerta(@Param('id', ParseIntPipe) id_producto: number, @Body() dataAlerta: Partial<AlertaStock>): Promise<Producto> {
    return await this.productoService.agregarAlerta(id_producto, dataAlerta);
  }
}