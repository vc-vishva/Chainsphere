// export class UpdateMerchantOnboardingDto extends PartialType(
//   OmitType(MerchantOnboardingDto, ['businessPrincipals'] as const),
// ) {
//   businessPrincipals?: Omit<BusinessPrincipals, 'ownerEmail'>[];

import { MerchantOnboardingDto } from './merchant-onboarding.dto';

// }
export class UpdateMerchantOnboardingDto extends MerchantOnboardingDto {}
