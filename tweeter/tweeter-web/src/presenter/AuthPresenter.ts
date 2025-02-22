import { Dispatch, SetStateAction } from "react";
import { NavigateFunction } from "react-router-dom";
import { AuthToken, User } from "tweeter-shared";
import { Presenter, View } from "./Presenter";

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
  protected constructor(view: AuthView) {
    super(view);
  }
}
