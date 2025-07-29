import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { PackService } from '../pack/pack.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  
  try {
    const packService = app.get(PackService);
    
    // Vérifier si des packs existent déjà
    const existingPacks = await packService.findAll();
    if (existingPacks.length > 0) {
      console.log('Les packs existent déjà, aucune initialisation nécessaire');
      return;
    }
    
    // Créer les packs d'abonnement prédéfinis
    const subscriptionPacks = [
      {
        nom: 'Abonnement Mensuel',
        nb_jours: 30,
        prix: 10000,
        duree_mois: 1,
        description: 'Accès complet à la plateforme pendant 1 mois',
        actif: true,
      },
      {
        nom: 'Abonnement Trimestriel',
        nb_jours: 90,
        prix: 25000,
        duree_mois: 3,
        description: 'Accès complet à la plateforme pendant 3 mois (économisez 16%)',
        actif: true,
      },
      {
        nom: 'Abonnement Semestriel',
        nb_jours: 180,
        prix: 45000,
        duree_mois: 6,
        description: 'Accès complet à la plateforme pendant 6 mois (économisez 25%)',
        actif: true,
      },
    ];
    
    // Insérer les packs dans la base de données
    for (const pack of subscriptionPacks) {
      await packService.create(pack);
    }
    
    console.log('Packs d\'abonnement initialisés avec succès');
  } catch (error) {
    console.error('Erreur lors de l\'initialisation des packs :', error);
  } finally {
    await app.close();
  }
}

bootstrap();
