import { UsuarioRol } from './usuario_rol.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioRolService } from './Usuario_Rol.service';
import { UsuarioRolController } from './Usuario_Rol.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UsuarioRol])],
  providers: [UsuarioRolService],
  controllers: [UsuarioRolController],
  exports: [UsuarioRolService],
})
export class UsuarioRolModule {}