import { NavigateFunction } from "react-router-dom";
import { AuthToken, User } from "tweeter-shared";

export interface AuthView {
  updateUserInfo: (
    currentUser: User,
    displayedUser: User | null,
    authToken: AuthToken,
    remember: boolean
  ) => void;
  navigate: NavigateFunction;
  displayErrorMessage: (message: string) => void;
}

export abstract class AuthPresenter {
  private _view: AuthView;
  private _isLoading: boolean = false;

  protected constructor(view: AuthView) {
    this._view = view;
  }

  public abstract checkSubmitButtonStatus(
    alias: string,
    password: string
  ): boolean;

  public get view() {
    return this._view;
  }

  public get isLoading() {
    return this._isLoading;
  }

  public set isLoading(isLoading: boolean) {
    this._isLoading = isLoading;
  }
}
