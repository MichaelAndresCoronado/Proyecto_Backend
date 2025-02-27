import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pedido } from './pedido.entity';
import { Detalle_Pedido } from 'src/detalle_pedido/detalle_pedido.entity';

@Injectable()
export class PedidoService {
  constructor(
    @InjectRepository(Pedido)
    private readonly pedidoRepository: Repository<Pedido>,
    @InjectRepository(Detalle_Pedido)
    private readonly detallePedidoRepository: Repository<Detalle_Pedido>,
  ) {}

  async findAll(): Promise<Pedido[]> {
    return await this.pedidoRepository.find({ relations: ['id_empresa', 'detalles'] });
  }

  async findOne(id: number): Promise<Pedido> {
    const pedido = await this.pedidoRepository.findOne({ where: { id_pedido: id }, relations: ['id_empresa', 'detalles'] });
    if (!pedido) throw new NotFoundException(`Pedido con ID ${id} no encontrado`);
    return pedido;
  }

  async create(data: Partial<Pedido>): Promise<Pedido> {
    const nuevoPedido = this.pedidoRepository.create(data);
    return await this.pedidoRepository.save(nuevoPedido);
  }

  async update(id_pedido: number, data: Partial<Pedido>): Promise<Pedido> {
    await this.pedidoRepository.update(id_pedido, data);
    return this.findOne(id_pedido);
  }

  async delete(id_pedido: number): Promise<void> {
    const pedido = await this.findOne(id_pedido);
    await this.pedidoRepository.remove(pedido);
  }

  // Método para agregar un detalle a un pedido
  async agregarDetalle(id_pedido: number, dataDetalle: Partial<Detalle_Pedido>): Promise<Pedido> {
    const pedido = await this.findOne(id_pedido);
    const detalleRepo = await this.detallePedidoRepository; // Asumimos un repositorio para Detalle_Pedido
    const detalle = detalleRepo.create({ ...dataDetalle, id_pedido: pedido });
    await detalleRepo.save(detalle);
    return this.findOne(id_pedido);
  }
}