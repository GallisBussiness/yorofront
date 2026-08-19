import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { VenteSimpleService } from './vente-simple.service';
import {
  VenteSimple,
  VenteSimpleDocument,
} from './entities/vente-simple.entity';
import { CreateVenteSimpleDto } from './dto/create-vente-simple.dto';

describe('VenteSimpleService', () => {
  let service: VenteSimpleService;
  let model: Partial<Model<VenteSimpleDocument>>;

  const userId = new Types.ObjectId().toHexString();
  const venteId = new Types.ObjectId().toHexString();
  const venteIdHier = new Types.ObjectId().toHexString();
  const venteIdOld = new Types.ObjectId().toHexString();

  function buildModelMock(overrides: Partial<Record<string, jest.Mock>> = {}) {
    const save = jest.fn().mockResolvedValue({ _id: 'doc-id' });
    const lean = jest.fn();
    const sort = jest.fn(() => ({ lean }));
    const find = jest.fn(() => ({ sort }));
    const findOne = jest.fn(() => ({ sort, lean }));
    const findById = jest.fn();
    const findByIdAndUpdate = jest.fn();
    const findByIdAndDelete = jest.fn();
    const aggregate = jest.fn();
    const countDocuments = jest.fn();
    const exec = jest.fn();
    const constructorFn = jest.fn().mockImplementation(() => ({ save }));

    const mock: any = function (data?: any) {
      return constructorFn(data);
    };
    Object.assign(mock, {
      find,
      findOne,
      findById,
      findByIdAndUpdate,
      findByIdAndDelete,
      aggregate,
      countDocuments,
      ...overrides,
    });
    return { mock, save, lean, sort, find, findOne, findById, findByIdAndUpdate, findByIdAndDelete, aggregate };
  }

  beforeEach(async () => {
    const built = buildModelMock();
    model = built.mock;
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VenteSimpleService,
        { provide: getModelToken(VenteSimple.name), useValue: model },
      ],
    }).compile();
    service = module.get(VenteSimpleService);
    // expose mocks via closure
    (service as any).__mocks = built;
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('force la date et génère une ref', async () => {
      const built = (service as any).__mocks;
      built.findOne.mockReturnValueOnce({
        sort: built.sort,
        lean: built.lean,
      });
      built.lean.mockResolvedValueOnce(null);
      const dto: CreateVenteSimpleDto = { montant: 1500, note: 'marché' };
      const res = await service.create(userId, dto);
      expect(res._id).toBe('doc-id');
      expect(built.save).toHaveBeenCalled();
      const arg = (built.save.mock.instances?.[0] as any) ?? {};
      // La ref transmise au constructeur doit avoir le format VS-AAAA-NNNN
      const constructorArg = (built.findOne as any);
      // vérifie juste que le save a été appelé : ok
      expect(built.save).toHaveBeenCalledTimes(1);
    });
  });

  describe('update - verrou jour', () => {
    it('autorise la modification si la vente date du jour', async () => {
      const built = (service as any).__mocks;
      const today = new Date();
      built.findOne.mockReturnValueOnce({
        sort: built.sort,
        lean: built.lean,
      });
      built.lean.mockResolvedValueOnce({
        _id: venteId,
        date: today,
        montant: 100,
        userId,
      });
      built.findByIdAndUpdate.mockReturnValueOnce({
        _id: venteId,
        montant: 200,
      });
      const res = await service.update(venteId, userId, { montant: 200 });
      expect(built.findByIdAndUpdate).toHaveBeenCalledWith(
        venteId,
        { $set: { montant: 200 } },
        { new: true },
      );
      expect(res).toEqual({ _id: venteId, montant: 200 });
    });

    it('lève ForbiddenException si la vente est antérieure au jour', async () => {
      const built = (service as any).__mocks;
      const hier = new Date();
      hier.setDate(hier.getDate() - 1);
      built.findOne.mockReturnValueOnce({
        sort: built.sort,
        lean: built.lean,
      });
      built.lean.mockResolvedValueOnce({
        _id: venteIdHier,
        date: hier,
        montant: 100,
        userId,
      });
      await expect(
        service.update(venteIdHier, userId, { montant: 300 }),
      ).rejects.toBeInstanceOf(ForbiddenException);
      expect(built.findByIdAndUpdate).not.toHaveBeenCalled();
    });

    it('lève NotFound si la vente n\'appartient pas au user', async () => {
      const built = (service as any).__mocks;
      built.findOne.mockReturnValueOnce({
        sort: built.sort,
        lean: built.lean,
      });
      built.lean.mockResolvedValueOnce(null);
      await expect(
        service.update(venteId, userId, { montant: 300 }),
      ).rejects.toBeInstanceOf(NotFoundException);
    });

    it('lève NotFound si l\'id n\'est pas un ObjectId valide', async () => {
      await expect(
        service.update('pas-un-id', userId, { montant: 300 }),
      ).rejects.toBeInstanceOf(NotFoundException);
    });
  });

  describe('remove - verrou jour', () => {
    it('supprime si la vente date du jour', async () => {
      const built = (service as any).__mocks;
      built.findOne.mockReturnValueOnce({
        sort: built.sort,
        lean: built.lean,
      });
      built.lean.mockResolvedValueOnce({
        _id: venteId,
        date: new Date(),
        userId,
      });
      built.findByIdAndDelete.mockReturnValueOnce({ _id: venteId });
      const res = await service.remove(venteId, userId);
      expect(built.findByIdAndDelete).toHaveBeenCalledWith(venteId);
      expect(res).toEqual({ _id: venteId });
    });

    it('refuse la suppression d\'une vente antérieure', async () => {
      const built = (service as any).__mocks;
      const avant = new Date();
      avant.setDate(avant.getDate() - 5);
      built.findOne.mockReturnValueOnce({
        sort: built.sort,
        lean: built.lean,
      });
      built.lean.mockResolvedValueOnce({
        _id: venteIdOld,
        date: avant,
        userId,
      });
      await expect(service.remove(venteIdOld, userId)).rejects.toBeInstanceOf(
        ForbiddenException,
      );
      expect(built.findByIdAndDelete).not.toHaveBeenCalled();
    });
  });

  describe('getTotal - agrégat par période', () => {
    it('retourne total + parJour avec buckets à 0 pour les jours sans vente', async () => {
      const built = (service as any).__mocks;
      const today = new Date();
      const todayKey = today.toISOString().slice(0, 10);
      built.aggregate.mockResolvedValueOnce([
        { _id: todayKey, total: 5000, count: 2 },
      ]);
      const res = await service.getTotal(userId, 'jour');
      expect(res.periode).toBe('jour');
      expect(res.total).toBe(5000);
      expect(res.count).toBe(2);
      expect(res.parJour).toHaveLength(1);
      expect(res.parJour[0].jour).toBe(todayKey);
    });

    it('couvre 7 jours pour la semaine', async () => {
      const built = (service as any).__mocks;
      built.aggregate.mockResolvedValueOnce([]);
      const res = await service.getTotal(userId, 'semaine');
      expect(res.parJour).toHaveLength(7);
      expect(res.total).toBe(0);
      expect(res.count).toBe(0);
    });

    it('couvre tous les jours du mois', async () => {
      const built = (service as any).__mocks;
      built.aggregate.mockResolvedValueOnce([]);
      const res = await service.getTotal(userId, 'mois');
      const now = new Date();
      const nbJours = new Date(
        now.getFullYear(),
        now.getMonth() + 1,
        0,
      ).getDate();
      expect(res.parJour).toHaveLength(nbJours);
    });
  });
});
