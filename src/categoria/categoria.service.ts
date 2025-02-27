import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Categoria } from './categoria.entity';
import { Producto } from 'src/producto/producto.entity';

@Injectable()
export class CategoriaService {
  constructor(
    @InjectRepository(Categoria)
    private readonly categoriaRepository: Repository<Categoria>,
    @InjectRepository(Producto)
    private readonly productoRepository: Repository<Producto>,
  ) {}

  async findAll(): Promise<Categoria[]> {
    return await this.categoriaRepository.find({ relations: ['productos'] });
  }

  async findOne(id: number): Promise<Categoria> {
    const categoria = await this.categoriaRepository.findOne({ where: { id_categoria: id }, relations: ['productos'] });
    if (!categoria) throw new NotFoundException(`Categoría con ID ${id} no encontrada`);
    return categoria;
  }

  async create(data: Partial<Categoria>): Promise<Categoria> {
    const nuevaCategoria = this.categoriaRepository.create(data);
    return await this.categoriaRepository.save(nuevaCategoria);
  }

  async update(id_categoria: number, data: Partial<Categoria>): Promise<Categoria> {
    await this.categoriaRepository.update(id_categoria, data);
    return this.findOne(id_categoria);
  }

  async delete(id_categoria: number): Promise<void> {
    const categoria = await this.findOne(id_categoria);
    await this.categoriaRepository.remove(categoria);
  }

  // Método para agregar un producto a una categoría (ejemplo)
  async agregarProducto(id_categoria: number, dataProducto: Partial<Producto>): Promise<Categoria> {
    const categoria = await this.findOne(id_categoria);
    const productoRepo = await this.productoRepository; // Asumimos un repositorio para Producto
    const producto = productoRepo.create({ ...dataProducto, id_categoria: categoria });
    await productoRepo.save(producto);
    return this.findOne(id_categoria);
  }
}