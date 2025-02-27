import { Body, Controller, Get, Param, ParseIntPipe, Post, Put, Delete, NotFoundException } from '@nestjs/common';
import { AlertaStockService } from './alerta-stock.service';
import { AlertaStock } from './alerta-stock.entity';

@Controller('alerta-stock')
export class AlertaStockController {
  constructor(private readonly alertaStockService: AlertaStockService) {}

  @Get()
  async obtenerTodos(): Promise<AlertaStock[]> {
    return await this.alertaStockService.findAll();
  }

  @Get(':id')
  async obtenerPorId(@Param('id', ParseIntPipe) id: number): Promise<AlertaStock> {
    return await this.alertaStockService.findOne(id);
  }

  @Post()
  async crear(@Body() data: Partial<AlertaStock>): Promise<AlertaStock> {
    return await this.alertaStockService.create(data);
  }

  @Put(':id')
  async actualizar(@Param('id', ParseIntPipe) id_alerta: number, @Body() data: Partial<AlertaStock>): Promise<AlertaStock> {
    return await this.alertaStockService.update(id_alerta, data);
  }

  @Delete(':id')
  async eliminar(@Param('id', ParseIntPipe) id_alerta: number): Promise<void> {
    await this.alertaStockService.delete(id_alerta);
  }
}