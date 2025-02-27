import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlertaStock } from './alerta-stock.entity';
import { AlertaStockService } from './alerta-stock.service';
import { AlertaStockController } from './alerta-stock.controller';

@Module({
  imports: [TypeOrmModule.forFeature([AlertaStock])],
  providers: [AlertaStockService],
  controllers: [AlertaStockController],
  exports: [AlertaStockService]
})
export class AlertaStockModule {}