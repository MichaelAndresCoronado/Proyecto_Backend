import { Body, Controller, Get, Param, ParseIntPipe, Post, Put, Delete, NotFoundException } from '@nestjs/common';
import { RolService } from './rol.service';
import { Rol } from './rol.entity';

@Controller('rol')
export class RolController {
  constructor(private readonly rolService: RolService) {}

  @Get()
  async obtenerTodos(): Promise<Rol[]> {
    return await this.rolService.findAll();
  }

  @Get(':id')
  async obtenerPorId(@Param('id', ParseIntPipe) id: number): Promise<Rol> {
    return await this.rolService.findOne(id);
  }

  @Post()
  async crear(@Body() data: Partial<Rol>): Promise<Rol> {
    return await this.rolService.create(data);
  }

  @Put(':id')
  async actualizar(@Param('id', ParseIntPipe) id_rol: number, @Body() data: Partial<Rol>): Promise<Rol> {
    return await this.rolService.update(id_rol, data);
  }

  @Delete(':id')
  async eliminar(@Param('id', ParseIntPipe) id_rol: number): Promise<void> {
    await this.rolService.delete(id_rol);
  }
}