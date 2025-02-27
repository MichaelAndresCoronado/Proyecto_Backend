import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Empresa } from './empresa.entity';
import { Pedido } from 'src/pedido/pedido.entity';

@Injectable()
export class EmpresaService {
  constructor(
    @InjectRepository(Empresa)
    private readonly empresaRepository: Repository<Empresa>,
    @InjectRepository(Pedido)
    private readonly pedidoRepository: Repository<Pedido>,
  ) {}

  async findAll(): Promise<Empresa[]> {
    return await this.empresaRepository.find({ relations: ['productos', 'inventarios', 'pedidos', 'reportes', 'usuarios'] });
  }

  async findOne(id: number): Promise<Empresa> {
    const empresa = await this.empresaRepository.findOne({ where: { id_empresa: id }, relations: ['productos', 'inventarios', 'pedidos', 'reportes', 'usuarios'] });
    if (!empresa) throw new NotFoundException(`Empresa con ID ${id} no encontrada`);
    return empresa;
  }

  async create(data: Partial<Empresa>): Promise<Empresa> {
    const nuevaEmpresa = this.empresaRepository.create(data);
    return await this.empresaRepository.save(nuevaEmpresa);
  }

  async update(id_empresa: number, data: Partial<Empresa>): Promise<Empresa> {
    await this.empresaRepository.update(id_empresa, data);
    return this.findOne(id_empresa);
  }

  async delete(id_empresa: number): Promise<void> {
    const empresa = await this.findOne(id_empresa);
    await this.empresaRepository.remove(empresa);
  }

  // Método para agregar un pedido a una empresa (ejemplo)
  async agregarPedido(id_empresa: number, dataPedido: Partial<Pedido>): Promise<Empresa> {
    const empresa = await this.findOne(id_empresa);
    const pedidoRepo = await this.pedidoRepository; // Asumimos un repositorio para Pedido
    const pedido = pedidoRepo.create({ ...dataPedido, id_empresa: empresa });
    await pedidoRepo.save(pedido);
    return this.findOne(id_empresa);
  }
}