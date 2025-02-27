import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Detalle_Pedido } from './detalle_pedido.entity';
import { Pedido } from 'src/pedido/pedido.entity';

@Injectable()
export class Detalle_PedidoService {
  constructor(
    @InjectRepository(Detalle_Pedido)
    private readonly detallePedidoRepository: Repository<Detalle_Pedido>,
    @InjectRepository(Pedido)
    private readonly pedidoRepository: Repository<Pedido>,
    
  ) {}

  async findAll(): Promise<Detalle_Pedido[]> {
    return await this.detallePedidoRepository.find({ relations: ['id_pedido', 'id_producto'] });
  }

  async findOne(id: number): Promise<Detalle_Pedido> {
    const detallePedido = await this.detallePedidoRepository.findOne({ where: { id_detalle_pedido: id }, relations: ['id_pedido', 'id_producto'] });
    if (!detallePedido) throw new NotFoundException(`Detalle de pedido con ID ${id} no encontrado`);
    return detallePedido;
  }

  async create(data: Partial<Detalle_Pedido>): Promise<Detalle_Pedido> {
    const nuevoDetalle = this.detallePedidoRepository.create(data);
    return await this.detallePedidoRepository.save(nuevoDetalle);
  }

  async update(id_detalle_pedido: number, data: Partial<Detalle_Pedido>): Promise<Detalle_Pedido> {
    await this.detallePedidoRepository.update(id_detalle_pedido, data);
    return this.findOne(id_detalle_pedido);
  }

  async delete(id_detalle_pedido: number): Promise<void> {
    const detalle = await this.findOne(id_detalle_pedido);
    await this.detallePedidoRepository.remove(detalle);
  }

  // Método para agregar un detalle a un pedido (ejemplo)
  async agregarADetalle(id_pedido: number, dataDetalle: Partial<Detalle_Pedido>): Promise<Detalle_Pedido> {
    const pedidoRepo = await this.pedidoRepository; // Asumimos un repositorio para Pedido
    const pedido = await pedidoRepo.findOne({ where: { id_pedido }, relations: ['detalles'] });
    if (!pedido) throw new NotFoundException(`Pedido con ID ${id_pedido} no encontrado`);
    const detalle = this.detallePedidoRepository.create({ ...dataDetalle, id_pedido: pedido });
    return await this.detallePedidoRepository.save(detalle);
  }
}