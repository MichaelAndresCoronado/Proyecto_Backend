import { Producto } from 'src/producto/producto.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, CreateDateColumn } from 'typeorm';

@Entity('categoria')
export class Categoria {
  @PrimaryGeneratedColumn()
  id_categoria: number;

  @Column()
  nombre: string;

  @Column({ nullable: true })
  descripcion: string;

  @CreateDateColumn()
  fecha_creacion: Date;

  @OneToMany(() => Producto, (producto) => producto.id_categoria, { cascade: true })
  productos: Producto[];
}