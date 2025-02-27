import { Body, Controller, Get, Param, ParseIntPipe, Post, Put, Delete, NotFoundException } from '@nestjs/common';
import { EmpresaService } from './empresa.service';
import { Empresa } from './empresa.entity';
import { Pedido } from 'src/pedido/pedido.entity';

@Controller('empresa')
export class EmpresaController {
  constructor(private readonly empresaService: EmpresaService) {}

  @Get()
  async obtenerTodos(): Promise<Empresa[]> {
    return await this.empresaService.findAll();
  }

  @Get(':id')
  async obtenerPorId(@Param('id', ParseIntPipe) id: number): Promise<Empresa> {
    return await this.empresaService.findOne(id);
  }

  @Post()
  async crear(@Body() data: Partial<Empresa>): Promise<Empresa> {
    return await this.empresaService.create(data);
  }

  @Put(':id')
  async actualizar(@Param('id', ParseIntPipe) id_empresa: number, @Body() data: Partial<Empresa>): Promise<Empresa> {
    return await this.empresaService.update(id_empresa, data);
  }

  @Delete(':id')
  async eliminar(@Param('id', ParseIntPipe) id_empresa: number): Promise<void> {
    await this.empresaService.delete(id_empresa);
  }

  // Ejemplo de endpoint para agregar un pedido
  @Post(':id/pedidos')
  async agregarPedido(@Param('id', ParseIntPipe) id_empresa: number, @Body() dataPedido: Partial<Pedido>): Promise<Empresa> {
    return await this.empresaService.agregarPedido(id_empresa, dataPedido);
  }
}