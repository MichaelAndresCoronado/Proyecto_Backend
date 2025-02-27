import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rol } from './rol.entity';

@Injectable()
export class RolService {
  constructor(
    @InjectRepository(Rol)
    private readonly rolRepository: Repository<Rol>,
  ) {}

  async findAll(): Promise<Rol[]> {
    return await this.rolRepository.find({ relations: ['usuariosRoles'] });
  }

  async findOne(id: number): Promise<Rol> {
    const rol = await this.rolRepository.findOne({ where: { id_rol: id }, relations: ['usuariosRoles'] });
    if (!rol) throw new NotFoundException(`Rol con ID ${id} no encontrado`);
    return rol;
  }

  async create(data: Partial<Rol>): Promise<Rol> {
    const nuevoRol = this.rolRepository.create(data);
    return await this.rolRepository.save(nuevoRol);
  }

  async update(id_rol: number, data: Partial<Rol>): Promise<Rol> {
    await this.rolRepository.update(id_rol, data);
    return this.findOne(id_rol);
  }

  async delete(id_rol: number): Promise<void> {
    const rol = await this.findOne(id_rol);
    await this.rolRepository.remove(rol);
  }
}