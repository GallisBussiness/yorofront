import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Pack, PackDocument } from '../entities/pack.entity';

@Injectable()
export class SubscriptionPacksSeedService {
  constructor(
    @InjectModel(Pack.name) private readonly packModel: Model<PackDocument>,
  ) {}

  async seed() {
    // Vérifier si des packs existent déjà
    const count = await this.packModel.countDocuments();
    if (count > 0) {
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
    await this.packModel.insertMany(subscriptionPacks);
    console.log('Packs d\'abonnement initialisés avec succès');
  }
}
