import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { UsuarioRol } from '../Usuario_Rol/usuario_rol.entity';

@Entity('rol')
export class Rol {
  @PrimaryGeneratedColumn()
  id_rol: number;

  @Column()
  nombre: string;

  @Column({ nullable: true })
  descripcion: string;

  @OneToMany(() => UsuarioRol, (usuarioRol) => usuarioRol.id_rol, { cascade: true })
  usuariosRoles: UsuarioRol[];
}