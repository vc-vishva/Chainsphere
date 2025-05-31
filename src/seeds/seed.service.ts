import { Injectable } from "@nestjs/common";
import { UserService } from "src/user/user.service";
import { admin } from "./admin";


@Injectable()
export class SeedsService {
  /**
   * Seed Service Constructor
   * @param models stateAndCitiesModel, currencyModel, userNotificationModel, linkToPayAgentDataModel
   */

  constructor(
    private readonly userService: UserService,
  ) {}



  async seedSuperAdmin(): Promise<string> {
    const existingUsers = await this.userService.getUserJson({
      email: admin[0].email,
      userType: 'Admin',
    });
    // Clone the first super admin object from array
    const adminUser = { ...admin[0] };
    if (!existingUsers) {
      await this.userService.createUser(adminUser);
      return 'Super admin added successfully.';
    } else {
      console.log('Super admin already exists. Skipping the seed.');
      return 'Super admin already exists. Skipping the seed.';
    }
  }
}
