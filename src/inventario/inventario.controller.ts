import { Body, Controller, Get, Param, ParseIntPipe, Post, Put, Delete, NotFoundException } from '@nestjs/common';
import { InventarioService } from './inventario.service';
import { Inventario } from './inventario.entity';

@Controller('inventario')
export class InventarioController {
  constructor(private readonly inventarioService: InventarioService) {}

  @Get()
  async obtenerTodos(): Promise<Inventario[]> {
    return await this.inventarioService.findAll();
  }

  @Get(':id')
  async obtenerPorId(@Param('id', ParseIntPipe) id: number): Promise<Inventario> {
    return await this.inventarioService.findOne(id);
  }

  @Post()
  async crear(@Body() data: Partial<Inventario>): Promise<Inventario> {
    return await this.inventarioService.create(data);
  }

  @Put(':id')
  async actualizar(@Param('id', ParseIntPipe) id_inventario: number, @Body() data: Partial<Inventario>): Promise<Inventario> {
    return await this.inventarioService.update(id_inventario, data);
  }

  @Delete(':id')
  async eliminar(@Param('id', ParseIntPipe) id_inventario: number): Promise<void> {
    await this.inventarioService.delete(id_inventario);
  }
}