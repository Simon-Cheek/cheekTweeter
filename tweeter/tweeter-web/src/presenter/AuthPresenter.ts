import { Dispatch, SetStateAction } from "react";
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

export abstract class AuthPresenter {
  private _view: AuthView;

  protected constructor(view: AuthView) {
    this._view = view;
  }

  public get view() {
    return this._view;
  }
}
