import { Test, TestingModule } from '@nestjs/testing';
import { DetteFournisseurService } from './dette_fournisseur.service';

describe('DetteFournisseurService', () => {
  let service: DetteFournisseurService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DetteFournisseurService],
    }).compile();

    service = module.get<DetteFournisseurService>(DetteFournisseurService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
