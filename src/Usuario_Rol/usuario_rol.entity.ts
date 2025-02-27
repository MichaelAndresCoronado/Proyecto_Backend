import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn } from 'typeorm';
import { Usuario } from '../usuario/usuario.entity';
import { Rol } from '../rol/rol.entity';

@Entity('usuario_rol')
export class UsuarioRol {
  @PrimaryGeneratedColumn()
  id_usuario_rol: number;

  @ManyToOne(() => Usuario, (usuario) => usuario.usuarioRoles, {onDelete: 'CASCADE'})
  id_usuario: Usuario;

  @ManyToOne(() => Rol, (rol) => rol.usuariosRoles, {onDelete: 'CASCADE'})
  id_rol: Rol;

  @CreateDateColumn()
  fecha_asignacion: Date;
}