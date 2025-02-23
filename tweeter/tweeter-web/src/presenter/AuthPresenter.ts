import { Dispatch, SetStateAction } from "react";
import { NavigateFunction } from "react-router-dom";
import { AuthToken, User } from "tweeter-shared";
import { Presenter, View } from "./Presenter";
import { UserService } from "../model/service/UserService";

export interface AuthView extends View {
  updateUserInfo: (
    currentUser: User,
    displayedUser: User | null,
    authToken: AuthToken,
    remember: boolean
  ) => void;
  navigate: NavigateFunction;
  firstName?: string;
  lastName?: string;
  setFirstName?: Dispatch<SetStateAction<string>>;
  setLastName?: Dispatch<SetStateAction<string>>;
  imageUrl?: string;
  setImageUrl?: Dispatch<SetStateAction<string>>;
  imageFileExtension?: string;
  setImageFileExtension?: Dispatch<SetStateAction<string>>;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  imageBytes?: Uint8Array;
  setImageBytes?: Dispatch<SetStateAction<Uint8Array>>;
}

export abstract class AuthPresenter extends Presenter<AuthView> {
  protected userService: UserService;
  public constructor(view: AuthView) {
    super(view);
    this.userService = new UserService();
  }

  protected abstract handleAuth(
    alias: string,
    password: string
  ): Promise<[User, AuthToken]>;
  protected abstract handleNavigation(originalUrl?: string): void;
  protected abstract getActionDesc(): string;

  protected async doAuthenticate(
    alias: string,
    password: string,
    rememberMe: boolean,
    originalUrl?: string
  ) {
    this.doFailureReportFinallyOp(
      async () => {
        this.view.setIsLoading(true);
        const [user, authToken] = await this.handleAuth(alias, password);
        this.view.updateUserInfo(user, user, authToken, rememberMe);
        this.handleNavigation(originalUrl);
      },
      this.getActionDesc(),
      () => {
        this.view.setIsLoading(false);
      }
    );
  }
}
