import { Body, Controller, Get, Param, ParseIntPipe, Post, Put, Delete, NotFoundException } from '@nestjs/common';
import { ProveedorService } from './proveedor.service';
import { Proveedor } from './proveedor.entity';
import { Producto } from 'src/producto/producto.entity';

@Controller('proveedor')
export class ProveedorController {
  constructor(private readonly proveedorService: ProveedorService) {}

  @Get()
  async obtenerTodos(): Promise<Proveedor[]> {
    return await this.proveedorService.findAll();
  }

  @Get(':id')
  async obtenerPorId(@Param('id', ParseIntPipe) id: number): Promise<Proveedor> {
    return await this.proveedorService.findOne(id);
  }

  @Post()
  async crear(@Body() data: Partial<Proveedor>): Promise<Proveedor> {
    return await this.proveedorService.create(data);
  }

  @Put(':id')
  async actualizar(@Param('id', ParseIntPipe) id_proveedor: number, @Body() data: Partial<Proveedor>): Promise<Proveedor> {
    return await this.proveedorService.update(id_proveedor, data);
  }

  @Delete(':id')
  async eliminar(@Param('id', ParseIntPipe) id_proveedor: number): Promise<void> {
    await this.proveedorService.delete(id_proveedor);
  }

  // Ejemplo de endpoint para agregar un producto
  @Post(':id/productos')
  async agregarProducto(@Param('id', ParseIntPipe) id_proveedor: number, @Body() dataProducto: Partial<Producto>): Promise<Proveedor> {
    return await this.proveedorService.agregarProducto(id_proveedor, dataProducto);
  }
}