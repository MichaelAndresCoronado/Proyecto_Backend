import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Pedido } from '../pedido/pedido.entity';
import { Producto } from '../producto/producto.entity';

@Entity('detalle_pedido')
export class Detalle_Pedido {
  @PrimaryGeneratedColumn()
  id_detalle_pedido: number;

  @ManyToOne(() => Pedido, (pedido) => pedido.detalles, {onDelete: 'CASCADE'})
  id_pedido: Pedido;

  @ManyToOne(() => Producto, (producto) => producto.detalles, {onDelete: 'CASCADE'})
  id_producto: Producto;

  @Column()
  cantidad: number;

  @Column('decimal', { precision: 10, scale: 2 })
  precio_unitario: number;
}