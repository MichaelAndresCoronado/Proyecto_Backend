import { Body, Controller, Get, Param, ParseIntPipe, Post, Put, Delete, NotFoundException } from '@nestjs/common';
import { ReporteService } from './reporte.service';
import { Reporte } from './reporte.entity';

@Controller('reporte')
export class ReporteController {
  constructor(private readonly reporteService: ReporteService) {}

  @Get()
  async obtenerTodos(): Promise<Reporte[]> {
    return await this.reporteService.findAll();
  }

  @Get(':id')
  async obtenerPorId(@Param('id', ParseIntPipe) id: number): Promise<Reporte> {
    return await this.reporteService.findOne(id);
  }

  @Post()
  async crear(@Body() data: Partial<Reporte>): Promise<Reporte> {
    return await this.reporteService.create(data);
  }

  @Put(':id')
  async actualizar(@Param('id', ParseIntPipe) id_reporte: number, @Body() data: Partial<Reporte>): Promise<Reporte> {
    return await this.reporteService.update(id_reporte, data);
  }

  @Delete(':id')
  async eliminar(@Param('id', ParseIntPipe) id_reporte: number): Promise<void> {
    await this.reporteService.delete(id_reporte);
  }
}