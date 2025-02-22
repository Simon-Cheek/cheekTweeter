import { AuthToken, Status, User } from "tweeter-shared";
import { PagedPresenter, PagedView } from "./PagedPresenter";
import { StatusService } from "../model/service/StatusService";

export abstract class StatusItemPresenter extends PagedPresenter<
  Status,
  StatusService
> {
  protected createService(): StatusService {
    return new StatusService();
  }
}
