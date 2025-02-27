import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Categoria } from '../categoria/categoria.entity';
import { Empresa } from '../empresa/empresa.entity';
import { Proveedor } from '../proveedor/proveedor.entity';
import { AlertaStock } from '../alerta-stock/alerta-stock.entity';
import { Detalle_Pedido } from '../detalle_pedido/detalle_pedido.entity';
import { MovimientoInventario } from '../movimiento_inventario/movimiento_inventario.entity';

@Entity('producto')
export class Producto {
  @PrimaryGeneratedColumn()
  id_producto: number;

  @Column({ unique: true })
  codigo_barras: string;

  @Column()
  nombre: string;

  @Column({ nullable: true })
  descripcion: string;

  @ManyToOne(() => Categoria, (categoria) => categoria.productos, {onDelete: 'CASCADE'})
  id_categoria: Categoria;

  @Column()
  precio_compra: number;

  @Column()
  precio_venta: number;

  @Column()
  stock_minimo: number;

  @Column()
  stock_maximo: number;

  @ManyToOne(() => Empresa, (empresa) => empresa.productos, {onDelete: 'CASCADE'})
  id_empresa: Empresa;

  @ManyToOne(() => Proveedor, (proveedor) => proveedor.productos, { nullable: true, onDelete: 'CASCADE' })
  id_proveedor: Proveedor;

  @CreateDateColumn()
  fecha_creacion: Date;

  @UpdateDateColumn()
  ultima_actualizacion: Date;

  @OneToMany(() => AlertaStock, (alertaStock) => alertaStock.id_producto, { cascade: true })
  alertas: AlertaStock[];

  @OneToMany(() => Detalle_Pedido, (detallePedido) => detallePedido.id_producto, { cascade: true })
  detalles: Detalle_Pedido[];

  @OneToMany(() => MovimientoInventario, (movimientoInventario) => movimientoInventario.id_producto, { cascade: true })
  movimientos: MovimientoInventario[];
}