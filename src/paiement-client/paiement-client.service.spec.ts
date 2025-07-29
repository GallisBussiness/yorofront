import { Test, TestingModule } from '@nestjs/testing';
import { PaiementClientService } from './paiement-client.service';

describe('PaiementClientService', () => {
  let service: PaiementClientService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaiementClientService],
    }).compile();

    service = module.get<PaiementClientService>(PaiementClientService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
