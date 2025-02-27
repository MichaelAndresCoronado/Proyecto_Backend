import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Producto } from './producto.entity';
import { AlertaStock } from 'src/alerta-stock/alerta-stock.entity';

@Injectable()
export class ProductoService {
  constructor(
    @InjectRepository(Producto)
    private readonly productoRepository: Repository<Producto>,
    @InjectRepository(AlertaStock)
    private readonly alertaStockRepository: Repository<AlertaStock>,
  ) {}

  async findAll(): Promise<Producto[]> {
    return await this.productoRepository.find({ relations: ['id_categoria', 'id_empresa', 'id_proveedor', 'alertas', 'detalles', 'movimientos'] });
  }

  async findOne(id: number): Promise<Producto> {
    const producto = await this.productoRepository.findOne({ where: { id_producto: id }, relations: ['id_categoria', 'id_empresa', 'id_proveedor', 'alertas', 'detalles', 'movimientos'] });
    if (!producto) throw new NotFoundException(`Producto con ID ${id} no encontrado`);
    return producto;
  }

  async create(data: Partial<Producto>): Promise<Producto> {
    const now = new Date();
    const nuevoProducto = this.productoRepository.create({
      ...data,
      fecha_creacion: now,
      ultima_actualizacion: now,
    });
    return await this.productoRepository.save(nuevoProducto);
  }

  async update(id_producto: number, data: Partial<Producto>): Promise<Producto> {
    const now = new Date();
    await this.productoRepository.update(id_producto, { ...data, ultima_actualizacion: now });
    return this.findOne(id_producto);
  }

  async delete(id_producto: number): Promise<void> {
    const producto = await this.findOne(id_producto);
    await this.productoRepository.remove(producto);
  }

  // Método para agregar una alerta a un producto (ejemplo)
  async agregarAlerta(id_producto: number, dataAlerta: Partial<AlertaStock>): Promise<Producto> {
    const producto = await this.findOne(id_producto);
    const alertaRepo = await this.alertaStockRepository; // Asumimos un repositorio para AlertaStock
    const alerta = alertaRepo.create({ ...dataAlerta, id_producto: producto });
    await alertaRepo.save(alerta);
    return this.findOne(id_producto);
  }
}