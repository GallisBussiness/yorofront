import { Module } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { InventoryController } from './inventory.controller';
import { AchatModule } from 'src/achat/achat.module';
import { VenteModule } from 'src/vente/vente.module';
import { ArticleModule } from 'src/article/article.module';

@Module({
  imports:[AchatModule,VenteModule,ArticleModule],
  controllers: [InventoryController],
  providers: [InventoryService],
})
export class InventoryModule {}
