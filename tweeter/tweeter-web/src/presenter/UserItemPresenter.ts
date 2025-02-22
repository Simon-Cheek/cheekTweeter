import { User } from "tweeter-shared";
import { PagedPresenter, PagedView } from "./PagedPresenter";
import { FollowService } from "../model/service/FollowService";

export interface UserItemView extends PagedView<User> {}

export abstract class UserItemPresenter extends PagedPresenter<
  User,
  FollowService
> {
  protected createService(): FollowService {
    return new FollowService();
  }
}
