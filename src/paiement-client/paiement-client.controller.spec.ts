import { Test, TestingModule } from '@nestjs/testing';
import { PaiementClientController } from './paiement-client.controller';
import { PaiementClientService } from './paiement-client.service';

describe('PaiementClientController', () => {
  let controller: PaiementClientController;
  let service: PaiementClientService;

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaiementClientController],
      providers: [PaiementClientService],
    }).compile();

    controller = module.get<PaiementClientController>(PaiementClientController);
    service = module.get<PaiementClientService>(PaiementClientService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // Example Test Cases
  it('should create a payment', async () => {
    const paymentDto = { /* payment details */ };
    jest.spyOn(service, 'create').mockResolvedValue({ _id: '123', amount: 100, client: 'client-id' });
    expect(await controller.create(paymentDto)).toEqual({ id: '123', amount: 100, client: 'client-id' });
  });

  it('should retrieve a payment by id', async () => {
    const paymentId = '1';
    jest.spyOn(service, 'findOne').mockResolvedValue({ id: '1', amount: 100, client: 'client-id' });
    expect(await controller.findOne(paymentId)).toEqual({ id: '1', amount: 100, client: 'client-id' });
  });

  it('should return all payments', async () => {
    jest.spyOn(service, 'findAll').mockResolvedValue([{ id: '1', amount: 100, client: 'client-id' }]);
    expect(await controller.findAll()).toEqual([{ id: '1', amount: 100, client: 'client-id' }]);
  });

  it('should update a payment', async () => {
    const paymentId = '1';
    const updateDto = { /* update details */ };
    jest.spyOn(service, 'update').mockResolvedValue({ id: '1', amount: 150, client: 'client-id' });
    expect(await controller.update(paymentId, updateDto)).toEqual({ id: '1', amount: 150, client: 'client-id' });
  });

  it('should delete a payment', async () => {
    const paymentId = '1';
    jest.spyOn(service, 'remove').mockResolvedValue({});
    expect(await controller.remove(paymentId)).toEqual({});
  });

  // Additional test cases can be added here
  // You can create test cases for:
  // - Error handling (e.g., payment not found, validation errors)
  // - Edge cases (e.g., empty input, invalid data)
  // - Performance tests (if applicable)
  // - Other controller methods as needed

  // Example of an error handling test case
  it('should throw an error if payment not found', async () => {
    const paymentId = 'non-existing-id';
    jest.spyOn(service, 'findOne').mockRejectedValue(new Error('Payment not found'));
    await expect(controller.findOne(paymentId)).rejects.toThrow('Payment not found');
  });
});