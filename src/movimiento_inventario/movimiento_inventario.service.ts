import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MovimientoInventario } from './movimiento_inventario.entity';
import { Producto } from 'src/producto/producto.entity';

@Injectable()
export class MovimientoInventarioService {
  constructor(
    @InjectRepository(MovimientoInventario)
    private readonly movimientoInventarioRepository: Repository<MovimientoInventario>,
    @InjectRepository(Producto)
    private readonly productoRepository: Repository<Producto>,
  ) {}

  async findAll(): Promise<MovimientoInventario[]> {
    return await this.movimientoInventarioRepository.find({ relations: ['id_producto', 'id_usuario'] });
  }

  async findOne(id: number): Promise<MovimientoInventario> {
    const movimiento = await this.movimientoInventarioRepository.findOne({ where: { id_movimiento: id }, relations: ['id_producto', 'id_usuario'] });
    if (!movimiento) throw new NotFoundException(`Movimiento de inventario con ID ${id} no encontrado`);
    return movimiento;
  }

  async create(data: Partial<MovimientoInventario>): Promise<MovimientoInventario> {
    const nuevoMovimiento = this.movimientoInventarioRepository.create(data);
    return await this.movimientoInventarioRepository.save(nuevoMovimiento);
  }

  async update(id_movimiento: number, data: Partial<MovimientoInventario>): Promise<MovimientoInventario> {
    await this.movimientoInventarioRepository.update(id_movimiento, data);
    return this.findOne(id_movimiento);
  }

  async delete(id_movimiento: number): Promise<void> {
    const movimiento = await this.findOne(id_movimiento);
    await this.movimientoInventarioRepository.remove(movimiento);
  }

  // Método para agregar un movimiento a un producto (ejemplo)
  async agregarAMovimiento(id_producto: number, dataMovimiento: Partial<MovimientoInventario>): Promise<MovimientoInventario> {
    const productoRepo = await this.productoRepository; // Asumimos un repositorio para Producto
    const producto = await productoRepo.findOne({ where: { id_producto }, relations: ['movimientos'] });
    if (!producto) throw new NotFoundException(`Producto con ID ${id_producto} no encontrado`);
    const movimiento = this.movimientoInventarioRepository.create({ ...dataMovimiento, id_producto: producto });
    return await this.movimientoInventarioRepository.save(movimiento);
  }
}