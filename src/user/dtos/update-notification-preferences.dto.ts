import { IsBoolean } from 'class-validator';

export class UpdateUserNotificationPreferenceDto {
  @IsBoolean()
  status: boolean;
}
