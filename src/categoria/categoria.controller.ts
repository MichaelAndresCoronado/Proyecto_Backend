import { Body, Controller, Get, Param, ParseIntPipe, Post, Put, Delete, NotFoundException } from '@nestjs/common';
import { CategoriaService } from './categoria.service';
import { Categoria } from './categoria.entity';
import { Producto } from 'src/producto/producto.entity';

@Controller('categoria')
export class CategoriaController {
  constructor(private readonly categoriaService: CategoriaService) {}

  @Get()
  async obtenerTodos(): Promise<Categoria[]> {
    return await this.categoriaService.findAll();
  }

  @Get(':id')
  async obtenerPorId(@Param('id', ParseIntPipe) id: number): Promise<Categoria> {
    return await this.categoriaService.findOne(id);
  }

  @Post()
  async crear(@Body() data: Partial<Categoria>): Promise<Categoria> {
    return await this.categoriaService.create(data);
  }

  @Put(':id')
  async actualizar(@Param('id', ParseIntPipe) id_categoria: number, @Body() data: Partial<Categoria>): Promise<Categoria> {
    return await this.categoriaService.update(id_categoria, data);
  }

  @Delete(':id')
  async eliminar(@Param('id', ParseIntPipe) id_categoria: number): Promise<void> {
    await this.categoriaService.delete(id_categoria);
  }

  // Ejemplo de endpoint para agregar un producto
  @Post(':id/productos')
  async agregarProducto(@Param('id', ParseIntPipe) id_categoria: number, @Body() dataProducto: Partial<Producto>): Promise<Categoria> {
    return await this.categoriaService.agregarProducto(id_categoria, dataProducto);
  }
}