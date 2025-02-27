import { Body, Controller, Get, Param, ParseIntPipe, Post, Put, Delete, NotFoundException } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { Usuario } from './usuario.entity';
import { Reporte } from 'src/reporte/reporte.entity';

@Controller('usuarios')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Get()
  async obtenerTodos(): Promise<Usuario[]> {
    return await this.usuarioService.findAll();
  }

  @Get(':id')
  async obtenerPorId(@Param('id', ParseIntPipe) id_usuario: number): Promise<Usuario> {
    return await this.usuarioService.findOne(id_usuario);
  }

  @Post()
  async crear(@Body() data: Partial<Usuario>): Promise<Usuario> {
    return await this.usuarioService.create(data);
  }

  @Put(':id')
  async actualizar(@Param('id', ParseIntPipe) id_usuario: number, @Body() data: Partial<Usuario>): Promise<Usuario> {
    // Filtra las propiedades que no son relaciones de uno a muchos
    const { reportes, ...updateData } = data;
    const usuarioActualizado = await this.usuarioService.update(id_usuario, updateData);

    // Si hay reportes, actualízalos por separado
    if (reportes) {
      for (const reporte of reportes) {
        await this.usuarioService.agregarReporte(id_usuario, reporte);
      }
    }

    return usuarioActualizado;
  }

  @Delete(':id')
  async eliminar(@Param('id', ParseIntPipe) id_usuario: number): Promise<void> {
    await this.usuarioService.delete(id_usuario);
  }

  // Ejemplo de endpoint para agregar un reporte
  @Post(':id/reportes')
  async agregarReporte(@Param('id', ParseIntPipe) id_usuario: number, @Body() dataReporte: Partial<Reporte>): Promise<Usuario> {
    return await this.usuarioService.agregarReporte(id_usuario, dataReporte);
  }

  // Endpoint para asignar un rol a un usuario
  @Post(':id/roles/:id_rol')
  async asignarRol(@Param('id', ParseIntPipe) id_usuario: number, @Param('id_rol', ParseIntPipe) id_rol: number): Promise<Usuario> {
    return await this.usuarioService.asignarRol(id_usuario, id_rol);
  }

  // Endpoint para remover un rol de un usuario
  @Delete(':id/roles/:id_rol')
  async removerRol(@Param('id', ParseIntPipe) id_usuario: number, @Param('id_rol', ParseIntPipe) id_rol: number): Promise<Usuario> {
    return await this.usuarioService.removerRol(id_usuario, id_rol);
  }
}