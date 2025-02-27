import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Proveedor } from './proveedor.entity';
import { Producto } from 'src/producto/producto.entity';

@Injectable()
export class ProveedorService {
  constructor(
    @InjectRepository(Proveedor)
    private readonly proveedorRepository: Repository<Proveedor>,
    @InjectRepository(Producto)
    private readonly productoRepository: Repository<Producto>,
  ) {}

  async findAll(): Promise<Proveedor[]> {
    return await this.proveedorRepository.find({ relations: ['productos'] });
  }

  async findOne(id: number): Promise<Proveedor> {
    const proveedor = await this.proveedorRepository.findOne({ where: { id_proveedor: id }, relations: ['productos'] });
    if (!proveedor) throw new NotFoundException(`Proveedor con ID ${id} no encontrado`);
    return proveedor;
  }

  async create(data: Partial<Proveedor>): Promise<Proveedor> {
    const nuevoProveedor = this.proveedorRepository.create(data);
    return await this.proveedorRepository.save(nuevoProveedor);
  }

  async update(id_proveedor: number, data: Partial<Proveedor>): Promise<Proveedor> {
    await this.proveedorRepository.update(id_proveedor, data);
    return this.findOne(id_proveedor);
  }

  async delete(id_proveedor: number): Promise<void> {
    const proveedor = await this.findOne(id_proveedor);
    await this.proveedorRepository.remove(proveedor);
  }

  // Método para agregar un producto a un proveedor (ejemplo)
  async agregarProducto(id_proveedor: number, dataProducto: Partial<Producto>): Promise<Proveedor> {
    const proveedor = await this.findOne(id_proveedor);
    const productoRepo = await this.productoRepository; // Asumimos un repositorio para Producto
    const producto = productoRepo.create({ ...dataProducto, id_proveedor: proveedor });
    await productoRepo.save(producto);
    return this.findOne(id_proveedor);
  }
}