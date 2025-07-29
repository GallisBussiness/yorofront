import { Injectable, OnModuleInit } from '@nestjs/common';
import { SubscriptionPacksSeedService } from './pack/seed/subscription-packs.seed';

@Injectable()
export class AppInitService implements OnModuleInit {
  constructor(
    private readonly subscriptionPacksSeedService: SubscriptionPacksSeedService,
  ) {}

  async onModuleInit() {
    console.log('Initialisation des données de l\'application...');
    
    // Initialiser les packs d'abonnement
    await this.subscriptionPacksSeedService.seed();
    
    console.log('Initialisation terminée avec succès');
  }
}
