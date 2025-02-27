import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, UpdateDateColumn } from 'typeorm';
import { Empresa } from '../empresa/empresa.entity';

@Entity('inventario')
export class Inventario {
  @PrimaryGeneratedColumn()
  id_inventario: number;

  @ManyToOne(() => Empresa, (empresa) => empresa.inventarios, {onDelete: 'CASCADE'})
  id_empresa: Empresa;

  @UpdateDateColumn()
  fecha_actualizacion: Date;
}