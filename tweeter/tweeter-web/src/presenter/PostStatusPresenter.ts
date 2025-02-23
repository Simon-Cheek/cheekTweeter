import { AuthToken, Status, User } from "tweeter-shared";
import { StatusService } from "../model/service/StatusService";
import { Dispatch, SetStateAction } from "react";
import { Presenter, View } from "./Presenter";

export interface PostStatusView extends View {
  displayInfoMessage: (message: string, duration: number) => void;
  clearLastInfoMessage: () => void;
  currentUser: User | null;
  authToken: AuthToken | null;
  post: string;
  setPost: Dispatch<SetStateAction<string>>;
}

export class PostStatusPresenter extends Presenter<PostStatusView> {
  private _isLoading: boolean = false;
  private service: StatusService;

  constructor(view: PostStatusView) {
    super(view);
    this.service = new StatusService();
  }

  public get isLoading() {
    return this._isLoading;
  }

  public set isLoading(isLoading: boolean) {
    this._isLoading = isLoading;
  }

  public async submitPost() {
    this.doFailureReportFinallyOp(
      async () => {
        this.isLoading = true;
        this.view.displayInfoMessage("Posting status...", 0);

        const status = new Status(
          this.view.post,
          this.view.currentUser!,
          Date.now()
        );
        await this.service.postStatus(this.view.authToken!, status);
        this.view.setPost("");
        this.view.displayInfoMessage("Status posted!", 2000);
      },
      "post the status",
      () => {
        this.view.clearLastInfoMessage();
        this.isLoading = false;
      }
    );
  }
}
