import { PartialType, PickType } from '@nestjs/mapped-types';
import { StateData } from './create-state-city.dto';

export class GetStateAndCityDto extends PartialType(PickType(StateData, ['state', 'city', 'stateCode'] as const)) {}
