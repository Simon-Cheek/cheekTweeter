import { AuthToken, User } from "tweeter-shared";
import { View } from "./Presenter";
import { PagedPresenter, PagedView } from "./PagedPresenter";
import { UserService } from "../model/service/UserService";
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
