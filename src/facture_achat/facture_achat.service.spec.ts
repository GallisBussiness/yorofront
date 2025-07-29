import { Test, TestingModule } from '@nestjs/testing';
import { FactureAchatService } from './facture_achat.service';

describe('FactureAchatService', () => {
  let service: FactureAchatService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FactureAchatService],
    }).compile();

    service = module.get<FactureAchatService>(FactureAchatService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
