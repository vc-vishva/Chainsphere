import { Controller } from '@nestjs/common';
import { IcoPhaseService } from './ico-phase.service';

@Controller('ico-phase')
export class IcoPhaseController {
  constructor(private readonly icoPhaseService: IcoPhaseService) {}
}
