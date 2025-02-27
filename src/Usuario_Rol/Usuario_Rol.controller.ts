import { Body, Controller, Get, Param, ParseIntPipe, Post, Put, Delete, NotFoundException } from '@nestjs/common';
import { UsuarioRolService } from './Usuario_Rol.service';
import { UsuarioRol } from './usuario_rol.entity';

@Controller('usuario-rol')
export class UsuarioRolController {
  constructor(private readonly usuarioRolService: UsuarioRolService) {}

  @Get()
  async obtenerTodos(): Promise<UsuarioRol[]> {
    return await this.usuarioRolService.findAll();
  }

  @Get(':id')
  async obtenerPorId(@Param('id', ParseIntPipe) id: number): Promise<UsuarioRol> {
    return await this.usuarioRolService.findOne(id);
  }

  @Post()
  async crear(@Body() data: Partial<UsuarioRol>): Promise<UsuarioRol> {
    return await this.usuarioRolService.create(data);
  }

  @Put(':id')
  async actualizar(@Param('id', ParseIntPipe) id: number, @Body() data: Partial<UsuarioRol>): Promise<UsuarioRol> {
    return await this.usuarioRolService.update(id, data);
  }

  @Delete(':id')
  async eliminar(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.usuarioRolService.delete(id);
  }
}