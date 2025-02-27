import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, CreateDateColumn } from 'typeorm';
import { Empresa } from '../empresa/empresa.entity';
import { Detalle_Pedido } from '../detalle_pedido/detalle_pedido.entity';

@Entity('pedido')
export class Pedido {
  @PrimaryGeneratedColumn()
  id_pedido: number;

  @ManyToOne(() => Empresa, (empresa) => empresa.pedidos, {onDelete: 'CASCADE'})
  id_empresa: Empresa;

  @CreateDateColumn()
  fecha_solicitud: Date;

  @Column()
  fecha_entrega: Date;

  @Column({ nullable: true })
  estado: string;

  @OneToMany(() => Detalle_Pedido, (detalle) => detalle.id_pedido, { cascade: true })
  detalles: Detalle_Pedido[];
}