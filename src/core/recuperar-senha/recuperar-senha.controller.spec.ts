import { Test, TestingModule } from '@nestjs/testing';
import { RecuperarSenhaController } from './recuperar-senha.controller';
import { RecuperarSenhaService } from './recuperar-senha.service';

describe('RecuperarSenhaController', () => {
  let controller: RecuperarSenhaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RecuperarSenhaController],
      providers: [RecuperarSenhaService],
    }).compile();

    controller = module.get<RecuperarSenhaController>(RecuperarSenhaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
