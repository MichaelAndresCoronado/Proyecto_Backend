import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Empresa } from './empresa.entity';
import { EmpresaService } from './empresa.service';
import { EmpresaController } from './empresa.controller';
import { Pedido } from 'src/pedido/pedido.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Pedido, Empresa])],
  providers: [EmpresaService],
  controllers: [EmpresaController],
  exports: [EmpresaService] // Exportamos el service para que pueda ser utilizado en otros módulos.
})
export class EmpresaModule {}