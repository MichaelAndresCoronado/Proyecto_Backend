import { Entity, Column, PrimaryGeneratedColumn, OneToMany, CreateDateColumn } from 'typeorm';
import { Producto } from '../producto/producto.entity';
import { Inventario } from '../inventario/inventario.entity';
import { Pedido } from '../pedido/pedido.entity';
import { Reporte } from '../reporte/reporte.entity';
import { Usuario } from '../usuario/usuario.entity';

@Entity('empresa')
export class Empresa {
  @PrimaryGeneratedColumn()
  id_empresa: number;

  @Column()
  nombre: string;

  @Column()
  ruc: number;

  @Column({ nullable: true })
  direccion: string;

  @Column()
  telefono: string;

  @Column({ default: 'No especificado' })
  email_contacto: string;

  @Column({ default: 'No especificado' })
  sector: string;

  @CreateDateColumn()
  fechaCreacion: Date;

  @Column({ default: true })
  Estado: boolean;

  @OneToMany(() => Producto, (producto) => producto.id_empresa, { cascade: true })
  productos: Producto[];

  @OneToMany(() => Inventario, (inventario) => inventario.id_empresa, { cascade: true })
  inventarios: Inventario[];

  @OneToMany(() => Pedido, (pedido) => pedido.id_empresa, { cascade: true })
  pedidos: Pedido[];

  @OneToMany(() => Reporte, (reporte) => reporte.id_empresa, { cascade: true })
  reportes: Reporte[];

  @OneToMany(() => Usuario, (usuario) => usuario.id_empresa, { cascade: true })
  usuarios: Usuario[];
}