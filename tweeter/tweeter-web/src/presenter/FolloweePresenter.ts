import { AuthToken, User } from "tweeter-shared";
import { UserItemPresenter } from "./UserItemPresenter";
import { PAGE_SIZE } from "./PagedPresenter";

export class FolloweePresenter extends UserItemPresenter {
  protected async getMoreItems(
    authToken: AuthToken,
    userAlias: string
  ): Promise<[User[], boolean]> {
    return this.service.loadMoreFollowees(
      authToken!,
      userAlias,
      PAGE_SIZE,
      super.lastItem
    );
  }

  protected getItemDescription(): string {
    return "load followees";
  }
}
