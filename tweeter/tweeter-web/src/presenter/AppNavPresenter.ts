import { AuthToken } from "tweeter-shared";
import { UserService } from "../model/service/UserService";
import { Presenter, View } from "./Presenter";

export interface AppNavView extends View {
  location: any;
  authToken: AuthToken | null;
  clearUserInfo: () => void;
  displayInfoMessage: (message: string, duration: number) => void;
  clearLastInfoMessage: () => void;
}
export class AppNavPresenter extends Presenter<AppNavView> {
  private _userService: UserService;

  public constructor(view: AppNavView) {
    super(view);
    this._userService = new UserService();
  }

  public get userService(): UserService {
    return this._userService;
  }

  public async logOut() {
    this.view.displayInfoMessage("Logging Out...", 0);
    this.doFailureReportingOperation(async () => {
      await this.userService.logout(this.view.authToken!);
      this.view.clearLastInfoMessage();
      this.view.clearUserInfo();
    }, "log user out");
  }
}
