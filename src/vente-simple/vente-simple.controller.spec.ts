import { Test, TestingModule } from '@nestjs/testing';
import { createParamDecorator } from '@nestjs/common';

// Mock du décorateur Session pour éviter l'import transitif ESM (jose/better-auth)
jest.mock('@thallesp/nestjs-better-auth', () => ({
  Session: createParamDecorator((_data: unknown, ctx: any) => {
    const req = ctx.switchToHttp().getRequest();
    return req.session ?? { user: { id: 'u1' } };
  }),
}));

import { VenteSimpleController } from './vente-simple.controller';
import { VenteSimpleService } from './vente-simple.service';

describe('VenteSimpleController', () => {
  let controller: VenteSimpleController;
  const service = {
    create: jest.fn(),
    findAllByUser: jest.fn(),
    findOneForUser: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
    getTotal: jest.fn(),
    getTotalByRange: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VenteSimpleController],
      providers: [{ provide: VenteSimpleService, useValue: service }],
    }).compile();
    controller = module.get(VenteSimpleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('create tire le userId de la session', async () => {
    service.create.mockResolvedValueOnce({ _id: '1' });
    const session = { user: { id: 'u1' } };
    await controller.create(session as any, { montant: 50 });
    expect(service.create).toHaveBeenCalledWith('u1', { montant: 50 });
  });

  it('totalJour appelle getTotal avec "jour"', async () => {
    await controller.totalJour({ user: { id: 'u1' } } as any);
    expect(service.getTotal).toHaveBeenCalledWith('u1', 'jour');
  });

  it('totalSemaine appelle getTotal avec "semaine"', async () => {
    await controller.totalSemaine({ user: { id: 'u1' } } as any);
    expect(service.getTotal).toHaveBeenCalledWith('u1', 'semaine');
  });

  it('totalMois appelle getTotal avec "mois"', async () => {
    await controller.totalMois({ user: { id: 'u1' } } as any);
    expect(service.getTotal).toHaveBeenCalledWith('u1', 'mois');
  });

  it('totalCustom avec from/to appelle getTotalByRange', async () => {
    await controller.totalCustom(
      { user: { id: 'u1' } } as any,
      { from: '2026-01-01T00:00:00.000Z', to: '2026-01-31T23:59:59.999Z' },
    );
    expect(service.getTotalByRange).toHaveBeenCalledWith(
      'u1',
      new Date('2026-01-01T00:00:00.000Z'),
      new Date('2026-01-31T23:59:59.999Z'),
    );
  });
});
