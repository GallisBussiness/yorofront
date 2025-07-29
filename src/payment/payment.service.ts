import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Payment, PaymentDocument } from './entities/payment.entity';
import { Pack, PackDocument } from 'src/pack/entities/pack.entity';
import { AbstractModel } from 'src/utils/abstractmodel';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class PaymentService extends AbstractModel<Payment, CreatePaymentDto, UpdatePaymentDto> {
  constructor(
    @InjectModel(Payment.name) private readonly paymentModel: Model<PaymentDocument>,
    @InjectModel(Pack.name) private readonly packModel: Model<PackDocument>
  ) {
    super(paymentModel);
  }

  async create(createPaymentDto: CreatePaymentDto) {
    try {
      const pack = await this.packModel.findById(createPaymentDto.pack);
      if (!pack) {
        throw new NotFoundException(`Pack with ID ${createPaymentDto.pack} not found`);
      }

      // Générer une référence unique pour le paiement
      const ref = uuidv4();
      
      // Calculer la date de fin en fonction du type d'abonnement
      const startDate = new Date();
      const endDate = new Date();
      
      // Calculate months to add based on subscription type
      let monthsToAdd = pack.duree_mois; 
      endDate.setMonth(endDate.getMonth() + monthsToAdd);
      let type_abonnement = '';
      // Ajouter la durée en fonction du type d'abonnement
      switch (pack.duree_mois) {
        case 1:
          type_abonnement = 'mensuel';
          break;
        case 3:
          type_abonnement = 'trimestriel';
          break;
        case 6:
          type_abonnement = 'semestriel';
          break;
        default:
          type_abonnement = 'annuel';
      }

      // Créer le paiement avec les dates calculées
      const newPayment = new this.paymentModel({
        ...createPaymentDto,
        ref,
        date_debut: startDate,
        date_fin: endDate,
        type_abonnement,
        montant: pack.prix,
      });

      return await newPayment.save();
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    return await this.paymentModel.find().populate('pack').populate('user').exec();
  }

  async findAllByUserId(userId: string) {
    return await this.paymentModel.find({ user: userId }).populate('pack').exec();
  }

  async findOne(id: string) {
    const payment = await this.paymentModel.findById(id).populate('pack').populate('user').exec();
    if (!payment) {
      throw new NotFoundException(`Payment with ID ${id} not found`);
    }
    return payment;
  }

  async findByUser(userId: string) {
    return await this.paymentModel.find({ user: userId }).populate('pack');
  }

  async findByUserAndPack(userId: string, packId: string) {
    return await this.paymentModel.find({ user: userId, pack: packId }).populate('pack').exec();
  }

  async update(id: string, updatePaymentDto: UpdatePaymentDto) {
    const payment = await this.paymentModel.findByIdAndUpdate(id, updatePaymentDto, { new: true });
    if (!payment) {
      throw new NotFoundException(`Payment with ID ${id} not found`);
    }
    return payment;
  }

  async remove(id: string) {
    const payment = await this.paymentModel.findByIdAndDelete(id);
    if (!payment) {
      throw new NotFoundException(`Payment with ID ${id} not found`);
    }
    return payment;
  }
  
  async getActiveSubscription(userId: string) {
    const now = new Date();
    return await this.paymentModel.findOne({
      user: userId,
      date_debut: { $lte: now },
      date_fin: { $gte: now },
      statut: 'valide'
    }).populate('pack').exec();
  }
  
  async verifySubscription(userId: string) {
    const activeSubscription = await this.getActiveSubscription(userId);
    return {
      hasActiveSubscription: !!activeSubscription,
      subscription: activeSubscription
    };
  }

  async getUserHistory(userId: string) {
    return await this.paymentModel.find({ user: userId })
      .sort({ createdAt: -1 })
      .populate('pack')
      .exec();
  }
}
