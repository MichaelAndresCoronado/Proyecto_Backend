// usuario.service.ts (actualizado)
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './usuario.entity';
import { Reporte } from 'src/reporte/reporte.entity';
import { UsuarioRol } from 'src/Usuario_Rol/usuario_rol.entity';
import { Rol } from 'src/rol/rol.entity';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
    @InjectRepository(Reporte)
    private readonly reporteRepository: Repository<Reporte>,
    @InjectRepository(UsuarioRol)
    private readonly usuarioRolRepository: Repository<UsuarioRol>,
    @InjectRepository(Rol)
    private readonly rolRepository: Repository<Rol>,
  ) {}

  async findAll(): Promise<Usuario[]> {
    return await this.usuarioRepository.find({ relations: ['id_empresa', 'movimientos', 'reportes', 'usuarioRoles'] });
  }

  async findOne(id_usuario: number): Promise<Usuario> {
    const usuario = await this.usuarioRepository.findOne({ where: { id_usuario }, relations: ['id_empresa', 'movimientos', 'reportes', 'usuarioRoles'] });
    if (!usuario) throw new NotFoundException(`Usuario con ID ${id_usuario} no encontrado`);
    return usuario;
  }

  async create(data: Partial<Usuario>): Promise<Usuario> {
    const nuevoUsuario = this.usuarioRepository.create(data);
    return await this.usuarioRepository.save(nuevoUsuario);
  }

  async update(id_usuario: number, data: Partial<Usuario>): Promise<Usuario> {
    await this.usuarioRepository.update(id_usuario, data);
    return this.findOne(id_usuario);
  }

  async delete(id_usuario: number): Promise<void> {
    const usuario = await this.findOne(id_usuario);
    await this.usuarioRepository.remove(usuario);
  }

  // Método para agregar un reporte a un usuario
  async agregarReporte(id_usuario: number, dataReporte: Partial<Reporte>): Promise<Usuario> {
    const usuario = await this.findOne(id_usuario);
    const reporteRepo = await this.reporteRepository;
    const reporte = reporteRepo.create({ ...dataReporte, id_usuario: usuario });
    await reporteRepo.save(reporte);
    return this.findOne(id_usuario);
  }

  // Método para asignar un rol a un usuario
  async asignarRol(id_usuario: number, id_rol: number): Promise<Usuario> {
    const usuario = await this.findOne(id_usuario);
    const rol = await this.rolRepository.findOneOrFail({ where: { id_rol } }); // Asumimos un rolRepository; ajusta si es necesario
    const usuarioRol = this.usuarioRolRepository.create({ id_usuario: usuario, id_rol: rol });
    await this.usuarioRolRepository.save(usuarioRol);
    return this.findOne(id_usuario);
  }

  // Método para remover un rol de un usuario
  async removerRol(id_usuario: number, id_rol: number): Promise<Usuario> {
    const usuario = await this.findOne(id_usuario);
    const usuarioRol = await this.usuarioRolRepository.findOne({ where: { id_usuario: { id_usuario }, id_rol: { id_rol } } });
    if (!usuarioRol) throw new NotFoundException(`Relación usuario-rol no encontrada`);
    await this.usuarioRolRepository.remove(usuarioRol);
    return this.findOne(id_usuario);

  }
  // usuario.service.ts (fragmento)
async findByEmail(email: string): Promise<Usuario | null> {
  const usuario = await this.usuarioRepository.findOne({ where: { email } });
  return usuario || null;
}

}