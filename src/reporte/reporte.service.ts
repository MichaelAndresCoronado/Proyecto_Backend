import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reporte } from './reporte.entity';

@Injectable()
export class ReporteService {
  constructor(
    @InjectRepository(Reporte)
    private readonly reporteRepository: Repository<Reporte>,
  ) {}

  async findAll(): Promise<Reporte[]> {
    return await this.reporteRepository.find({ relations: ['id_empresa', 'id_usuario'] });
  }

  async findOne(id: number): Promise<Reporte> {
    const reporte = await this.reporteRepository.findOne({ where: { id_reporte: id }, relations: ['id_empresa', 'id_usuario'] });
    if (!reporte) throw new NotFoundException(`Reporte con ID ${id} no encontrado`);
    return reporte;
  }

  async create(data: Partial<Reporte>): Promise<Reporte> {
    const nuevoReporte = this.reporteRepository.create(data);
    return await this.reporteRepository.save(nuevoReporte);
  }

  async update(id_reporte: number, data: Partial<Reporte>): Promise<Reporte> {
    await this.reporteRepository.update(id_reporte, data);
    return this.findOne(id_reporte);
  }

  async delete(id_reporte: number): Promise<void> {
    const reporte = await this.findOne(id_reporte);
    await this.reporteRepository.remove(reporte);
  }
}