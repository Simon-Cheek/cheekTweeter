import { User } from "tweeter-shared";
import { PagedPresenter } from "./PagedPresenter";
import { FollowService } from "../model/service/FollowService";

export abstract class UserItemPresenter extends PagedPresenter<
  User,
  FollowService
> {
  protected createService(): FollowService {
    return new FollowService();
  }
}
