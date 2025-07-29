import { Test, TestingModule } from '@nestjs/testing';
import { FactureAchatController } from './facture_achat.controller';
import { FactureAchatService } from './facture_achat.service';

describe('FactureAchatController', () => {
  let controller: FactureAchatController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FactureAchatController],
      providers: [FactureAchatService],
    }).compile();

    controller = module.get<FactureAchatController>(FactureAchatController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
