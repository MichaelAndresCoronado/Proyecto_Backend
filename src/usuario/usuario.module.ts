import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './usuario.entity';
import { UsuarioService } from './usuario.service';
import { UsuarioController } from './usuario.controller';
import { Reporte } from 'src/reporte/reporte.entity';
import { UsuarioRol } from 'src/Usuario_Rol/usuario_rol.entity';
import { Rol } from 'src/rol/rol.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario, Reporte, UsuarioRol, Rol])],
  providers: [UsuarioService],
  controllers: [UsuarioController],
  exports: [UsuarioService]
})
export class UsuarioModule {}