import { Controller } from '@nestjs/common';
import { TokenPurchaseService } from './token-purchase.service';

@Controller('token-purchase')
export class TokenPurchaseController {
  constructor(private readonly tokenPurchaseService: TokenPurchaseService) {}
}
