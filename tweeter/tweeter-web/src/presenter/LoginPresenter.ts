import { User, AuthToken } from "tweeter-shared";
import { AuthPresenter } from "./AuthPresenter";

export class LoginPresenter extends AuthPresenter {
  protected getActionDesc(): string {
    return "log in user";
  }

  protected handleAuth(
    alias: string,
    password: string
  ): Promise<[User, AuthToken]> {
    return this.userService.login(alias, password);
  }

  protected handleNavigation(originalUrl?: string): void {
    if (!!originalUrl) {
      this.view.navigate(originalUrl);
    } else {
      this.view.navigate("/");
    }
  }

  public async doLogin(
    alias: string,
    password: string,
    rememberMe: boolean,
    originalUrl: string
  ) {
    this.doAuthenticate(alias, password, rememberMe);
  }
}
