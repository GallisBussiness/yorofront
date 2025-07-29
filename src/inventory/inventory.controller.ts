import { Controller, Get, Param } from '@nestjs/common';
import { AchatService } from 'src/achat/achat.service';
import { ArticleService } from 'src/article/article.service';
import { VenteService } from 'src/vente/vente.service';
@Controller('inventory')
export class InventoryController {
  constructor(
    private readonly achatService: AchatService,
    private readonly venteService: VenteService,
    private readonly articleService:ArticleService
   ) {}

  // @Post()
  // create(@Body() createInventoryDto: CreateInventoryDto) {
  //   return this.inventoryService.create(createInventoryDto);
  // }

  @Get('user/:userId')
  async findAll(@Param('userId') userId: string): Promise<any> {
    const [ventes,achats,articles] = await Promise.all([this.venteService.findByUserId(userId),this.achatService.findByUserId(userId),this.articleService.findByUserId(userId)]);
    const inventory = [];
    for (const article of articles) {
      const qv = ventes.reduce((acc,cur) => {
        const p = cur.produits.find((p:any) => p.ref === article.ref);
        acc.qte += p?.qte || 0
        acc.montant += (p?.pu * p?.qte) || 0;
        return acc;
      },{qte:0,montant:0});  
      const qa = achats.reduce((acc,cur) => {
        const p = cur.produits.find((p:any) => p.ref === article.ref);
        acc.qte += p?.qte || 0
        acc.montant += (p?.pu * p?.qte) || 0;
        return acc;
      },{qte:0,montant:0});
      const {_id,ref,stock_seuil} = article;
      inventory.push({_id,ref,stock_seuil,qv:qv?.qte,mv:qv?.montant,qa:qa.qte,ma:qa?.montant,qr:qa?.qte - qv?.qte,mr: qa?.montant - qv?.montant});
    }
    return inventory;
  }

  @Get('user/:userId/:id')
  async findOne(@Param('userId') userId: string, @Param('id') id: string) {
    const [ventes,achats,article] = await Promise.all([this.venteService.findByUserId(userId),this.achatService.findByUserId(userId),this.articleService.findOne(id)]);
    const v = ventes.filter(v => v.produits.some(a => a.ref === article.ref));
    const a = achats.filter(v => v.produits.some(a => a.ref === article.ref));
    const qv = v.reduce((acc,cur,i) => {
      const p = cur.produits.find((p:any) => p.ref === article.ref);
      acc.push({n:i+1,ref:cur.ref,date:cur.date,qte:p?.qte || 0,montant:(p?.pu * p?.qte) || 0})
      return acc;
    },[]); 
    const qa = a.reduce((acc,cur,i) => {
      const p = cur.produits.find((p:any) => p.ref === article.ref);
      acc.push({n:i+1,ref:cur.ref,date:cur.date,qte:p?.qte || 0,montant:(p?.pu * p?.qte) || 0})
      return acc;
    },[]);

    return {ventes:qv,achats:qa}
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateInventoryDto: UpdateInventoryDto) {
  //   return this.inventoryService.update(+id, updateInventoryDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.inventoryService.remove(+id);
  // }
}
