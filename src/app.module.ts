import {
  Module,
} from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ParamModule } from './param/param.module';
import { ClientModule } from './client/client.module';
import { FournisseurModule } from './fournisseur/fournisseur.module';
import { AchatModule } from './achat/achat.module';
import { VenteModule } from './vente/vente.module';
import { FamilleModule } from './famille/famille.module';
import { UniteModule } from './unite/unite.module';
import { ArticleModule } from './article/article.module';
import { PackModule } from './pack/pack.module';
import { FactureAchatModule } from './facture_achat/facture_achat.module';
import { FactureVenteModule } from './facture_vente/facture_vente.module';
import { InventoryModule } from './inventory/inventory.module';
import { PaiementClientModule } from './paiement-client/paiement-client.module';
import { PaiementFournisseurModule } from './paiement-fournisseur/paiement-fournisseur.module';
import { DepotModule } from './depot/depot.module';
import { DetteModule } from './dette/dette.module';
import { PaymentModule } from './payment/payment.module';
import { DetteFournisseurModule } from './dette_fournisseur/dette_fournisseur.module';
import { AuthModule, AuthGuard } from '@thallesp/nestjs-better-auth';
import { auth } from 'lib/auth';
import { APP_GUARD } from '@nestjs/core';
import { VentecaisseModule } from './ventecaisse/ventecaisse.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // no need to import into other modules
    }),
    MongooseModule.forRootAsync({
      useFactory: async (config: ConfigService) => ({
        uri: config.get('MONGODB_URL'),
        autoCreate: true,
      }),
      inject: [ConfigService],
      
    }),
    AuthModule.forRoot({auth,isGlobal:true}),
    ParamModule,
    ClientModule,
    FournisseurModule,
    AchatModule,
    VenteModule,
    FamilleModule,
    UniteModule,
    ArticleModule,
    PackModule,
    FactureAchatModule,
    FactureVenteModule,
    InventoryModule,
    PaiementClientModule,
    PaiementFournisseurModule,
    DepotModule,
    DetteModule,
    PaymentModule,
    DetteFournisseurModule,
    VentecaisseModule
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
