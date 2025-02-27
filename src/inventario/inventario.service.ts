import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Inventario } from './inventario.entity';

@Injectable()
export class InventarioService {
  constructor(
    @InjectRepository(Inventario)
    private readonly inventarioRepository: Repository<Inventario>,
  ) {}

  async findAll(): Promise<Inventario[]> {
    return await this.inventarioRepository.find({ relations: ['id_empresa'] });
  }

  async findOne(id: number): Promise<Inventario> {
    const inventario = await this.inventarioRepository.findOne({ where: { id_inventario: id }, relations: ['id_empresa'] });
    if (!inventario) throw new NotFoundException(`Inventario con ID ${id} no encontrado`);
    return inventario;
  }

  async create(data: Partial<Inventario>): Promise<Inventario> {
    const nuevoInventario = this.inventarioRepository.create(data);
    return await this.inventarioRepository.save(nuevoInventario);
  }

  async update(id_inventario: number, data: Partial<Inventario>): Promise<Inventario> {
    await this.inventarioRepository.update(id_inventario, data);
    return this.findOne(id_inventario);
  }

  async delete(id_inventario: number): Promise<void> {
    const inventario = await this.findOne(id_inventario);
    await this.inventarioRepository.remove(inventario);
  }
}