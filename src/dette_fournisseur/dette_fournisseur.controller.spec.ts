import { Test, TestingModule } from '@nestjs/testing';
import { DetteFournisseurController } from './dette_fournisseur.controller';
import { DetteFournisseurService } from './dette_fournisseur.service';

describe('DetteFournisseurController', () => {
  let controller: DetteFournisseurController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DetteFournisseurController],
      providers: [DetteFournisseurService],
    }).compile();

    controller = module.get<DetteFournisseurController>(DetteFournisseurController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
