import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToMany } from 'typeorm';
import { Producto } from '../producto/producto.entity';

@Entity('proveedor')
export class Proveedor {
  @PrimaryGeneratedColumn()
  id_proveedor: number;

  @Column()
  nombre: string;

  @Column({ nullable: true })
  contacto: string;

  @Column({ nullable: true })
  telefono: string;

  @Column({ default: 'No especificado' })
  email: string;

  @Column({ default: 'No especificado' })
  direccion: string;

  @CreateDateColumn()
  fecha_creacion: Date;

  @OneToMany(() => Producto, (producto) => producto.id_proveedor, { cascade: true })
  productos: Producto[];
}