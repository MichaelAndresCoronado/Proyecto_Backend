import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AlertaStock } from './alerta-stock.entity';

@Injectable()
export class AlertaStockService {
  constructor(
    @InjectRepository(AlertaStock)
    private readonly alertaStockRepository: Repository<AlertaStock>,
  ) {}

  async findAll(): Promise<AlertaStock[]> {
    return await this.alertaStockRepository.find({ relations: ['id_producto'] });
  }

  async findOne(id: number): Promise<AlertaStock> {
    const alerta = await this.alertaStockRepository.findOne({ where: { id_alerta: id }, relations: ['id_producto'] });
    if (!alerta) throw new NotFoundException(`Alerta de stock con ID ${id} no encontrada`);
    return alerta;
  }

  async create(data: Partial<AlertaStock>): Promise<AlertaStock> {
    const nuevaAlerta = this.alertaStockRepository.create(data);
    return await this.alertaStockRepository.save(nuevaAlerta);
  }

  async update(id_alerta: number, data: Partial<AlertaStock>): Promise<AlertaStock> {
    await this.alertaStockRepository.update(id_alerta, data);
    return this.findOne(id_alerta);
  }

  async delete(id_alerta: number): Promise<void> {
    const alerta = await this.findOne(id_alerta);
    await this.alertaStockRepository.remove(alerta);
  }
}