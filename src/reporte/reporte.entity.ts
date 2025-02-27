import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn } from 'typeorm';
import { Empresa } from '../empresa/empresa.entity';
import { Usuario } from '../usuario/usuario.entity';

@Entity('reporte')
export class Reporte {
  @PrimaryGeneratedColumn()
  id_reporte: number;

  @ManyToOne(() => Empresa, (empresa) => empresa.reportes, {onDelete: 'CASCADE'})
  id_empresa: Empresa;

  @Column({ nullable: true })
  tipo: string;

  @CreateDateColumn()
  fecha_generacion: Date;

  @Column({ nullable: true })
  archivo_pdf: string;

  @ManyToOne(() => Usuario, (usuario) => usuario.reportes, {onDelete: 'CASCADE'})
  id_usuario: Usuario;
}