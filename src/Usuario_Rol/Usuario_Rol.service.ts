import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsuarioRol } from './usuario_rol.entity';

@Injectable()
export class UsuarioRolService {
  constructor(
    @InjectRepository(UsuarioRol)
    private readonly usuarioRolRepository: Repository<UsuarioRol>,
  ) {}

  async findAll(): Promise<UsuarioRol[]> {
    return await this.usuarioRolRepository.find({ relations: ['id_usuario', 'id_rol'] });
  }

  async findOne(id: number): Promise<UsuarioRol> {
    const usuarioRol = await this.usuarioRolRepository.findOne({ where: { id_usuario_rol: id }, relations: ['id_usuario', 'id_rol'] });
    if (!usuarioRol) throw new NotFoundException(`UsuarioRol con ID ${id} no encontrado`);
    return usuarioRol;
  }

  async create(data: Partial<UsuarioRol>): Promise<UsuarioRol> {
    const nuevoUsuarioRol = this.usuarioRolRepository.create(data);
    return await this.usuarioRolRepository.save(nuevoUsuarioRol);
  }

  async update(id: number, data: Partial<UsuarioRol>): Promise<UsuarioRol> {
    await this.usuarioRolRepository.update(id, data);
    return this.findOne(id);
  }

  async delete(id: number): Promise<void> {
    const usuarioRol = await this.findOne(id);
    await this.usuarioRolRepository.remove(usuarioRol);
  }
}