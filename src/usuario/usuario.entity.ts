import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, CreateDateColumn } from 'typeorm';
import { Empresa } from '../empresa/empresa.entity';
import { MovimientoInventario } from '../movimiento_inventario/movimiento_inventario.entity';
import { Reporte } from '../reporte/reporte.entity';
import { UsuarioRol } from '../Usuario_Rol/usuario_rol.entity';

@Entity('usuario')
export class Usuario {
  @PrimaryGeneratedColumn()
  id_usuario: number;

  @Column()
  nombre_completo: string;

  @Column()
  email: string;

  @Column()
  telefono: string;

  @Column({ default: true })
  estado: boolean;

  @CreateDateColumn()
  fecha_creacion: Date;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  ultima_conexion: Date;

  @Column()
  password_hash: string;

  @ManyToOne(() => Empresa, (empresa) => empresa.usuarios, {onDelete: 'CASCADE'})
  id_empresa: Empresa;

  @OneToMany(() => MovimientoInventario, (movimiento) => movimiento.id_usuario, { cascade: true })
  movimientos: MovimientoInventario[];

  @OneToMany(() => Reporte, (reporte) => reporte.id_usuario, { cascade: true })
  reportes: Reporte[];

  @OneToMany(() => UsuarioRol, (usuarioRol) => usuarioRol.id_usuario, { cascade: true })
  usuarioRoles: UsuarioRol[];
}