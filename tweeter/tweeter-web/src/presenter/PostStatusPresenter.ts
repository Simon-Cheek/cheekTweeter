import { AuthToken, Status, User } from "tweeter-shared";
import { StatusService } from "../model/service/StatusService";
import { Dispatch, SetStateAction } from "react";

export interface PostStatusView {
  displayErrorMessage: (
    message: string,
    bootstrapClasses?: string | undefined
  ) => void;
  displayInfoMessage: (
    message: string,
    duration: number,
    bootstrapClasses?: string | undefined
  ) => void;
  clearLastInfoMessage: () => void;
  currentUser: User | null;
  authToken: AuthToken | null;
  post: string;
  setPost: Dispatch<SetStateAction<string>>;
}

export class PostStatusPresenter {
  private _isLoading: boolean = false;
  private _view: PostStatusView;
  private service: StatusService;

  constructor(view: PostStatusView) {
    this._view = view;
    this.service = new StatusService();
  }

  public get isLoading() {
    return this._isLoading;
  }

  public set isLoading(isLoading: boolean) {
    this._isLoading = isLoading;
  }

  public async submitPost() {
    try {
      this.isLoading = true;
      this._view.displayInfoMessage("Posting status...", 0);

      const status = new Status(
        this._view.post,
        this._view.currentUser!,
        Date.now()
      );

      await this.service.postStatus(this._view.authToken!, status);

      this._view.setPost("");
      this._view.displayInfoMessage("Status posted!", 2000);
    } catch (error) {
      this._view.displayErrorMessage(
        `Failed to post the status because of exception: ${error}`
      );
    } finally {
      this._view.clearLastInfoMessage();
      this.isLoading = false;
    }
  }
}
