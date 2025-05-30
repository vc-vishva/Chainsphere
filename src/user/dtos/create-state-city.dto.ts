import { Type } from 'class-transformer';
import { IsString, IsOptional, IsNotEmpty, IsBoolean, IsArray, ValidateNested } from 'class-validator';
import { validationMessages } from '../../common/configs/messages.config';

export class CreateStateAndCitiesDto {
  @IsBoolean()
  @IsNotEmpty()
  isReplace: boolean;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => StateData)
  @IsNotEmpty()
  stateAndCity: StateData[];
}

export class StateData {
  @IsString()
  @IsOptional()
  country: string;

  @IsString()
  @IsNotEmpty({ message: `State ${validationMessages.NOT_EMPTY}` })
  state: string;

  @IsString()
  @IsNotEmpty({ message: `City ${validationMessages.NOT_EMPTY}` })
  city: string;

  @IsString()
  @IsNotEmpty({ message: `StateCode ${validationMessages.NOT_EMPTY}` })
  stateCode: string;
}
