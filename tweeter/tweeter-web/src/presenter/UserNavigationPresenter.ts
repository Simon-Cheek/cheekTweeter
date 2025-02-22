import { AuthToken, User } from "tweeter-shared";
import { StatusService } from "../model/service/StatusService";
import { StatusItemPresenter, StatusItemView } from "./StatusItemPresenter";
import { UserService } from "../model/service/UserService";

export interface UserNavigationView {
  setDisplayedUser: (user: User) => void;
  currentUser: User | null;
  authToken: AuthToken | null;
  displayErrorMessage: (message: string, bootstrapClasses?: string) => void;
}
export class UserNavigationPresenter {
  private userService: UserService;
  private userNavView: UserNavigationView;

  public constructor(view: UserNavigationView) {
    this.userService = new UserService();
    this.userNavView = view;
  }

  public navigateToUser = async (event: React.MouseEvent): Promise<void> => {
    event.preventDefault();

    try {
      const alias = this.extractAlias(event.target.toString());

      const user = await this.getUser(this.userNavView.authToken!, alias);

      if (!!user) {
        if (this.userNavView.currentUser!.equals(user)) {
          this.userNavView.setDisplayedUser(this.userNavView.currentUser!);
        } else {
          this.userNavView.setDisplayedUser(user);
        }
      }
    } catch (error) {
      this.userNavView.displayErrorMessage(
        `Failed to get user because of exception: ${error}`
      );
    }
  };

  public extractAlias(value: string): string {
    const index = value.indexOf("@");
    return value.substring(index);
  }

  public async getUser(
    authToken: AuthToken,
    alias: string
  ): Promise<User | null> {
    return this.userService.getUser(authToken, alias);
  }
}
