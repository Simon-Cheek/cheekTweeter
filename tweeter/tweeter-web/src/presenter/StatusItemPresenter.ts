import { AuthToken, Status, User } from "tweeter-shared";
import { Presenter, View } from "./Presenter";
import { PagedPresenter, PagedView } from "./PagedPresenter";

export interface StatusItemView extends PagedView<Status> {}
export abstract class StatusItemPresenter extends PagedPresenter<Status> {
  // protected constructor(view: StatusItemView) {
  //   super(view);
  // }
}
