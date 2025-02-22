import { AuthToken, User } from "tweeter-shared";
import { View } from "./Presenter";
import { PagedPresenter, PagedView } from "./PagedPresenter";

export interface UserItemView extends PagedView<User> {}

export abstract class UserItemPresenter extends PagedPresenter<User> {
  // protected constructor(view: UserItemView) {
  //   super(view);
  // }
}
