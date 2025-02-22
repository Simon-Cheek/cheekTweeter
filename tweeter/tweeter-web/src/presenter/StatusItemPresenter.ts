import { AuthToken, Status, User } from "tweeter-shared";
import { Presenter, View } from "./Presenter";
import { PagedPresenter, PagedView } from "./PagedPresenter";
import { StatusService } from "../model/service/StatusService";

export interface StatusItemView extends PagedView<Status> {}
export abstract class StatusItemPresenter extends PagedPresenter<
  Status,
  StatusService
> {
  protected createService(): StatusService {
    return new StatusService();
  }
}
