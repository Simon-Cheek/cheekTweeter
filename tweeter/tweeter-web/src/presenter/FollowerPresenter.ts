import { AuthToken } from "tweeter-shared";
import { FollowService } from "../model/service/FollowService";
import { UserItemPresenter, UserItemView } from "./UserItemPresenter";

export const PAGE_SIZE = 10;

export class FollowerPresenter extends UserItemPresenter {
  private followerService: FollowService;

  public constructor(view: UserItemView) {
    super(view);
    this.followerService = new FollowService();
  }

  public async loadMoreItems(authToken: AuthToken, userAlias: string) {
    try {
      const [newItems, hasMore] = await this.followerService.loadMoreFollowers(
        authToken!,
        userAlias,
        PAGE_SIZE,
        super.lastItem
      );

      this.hasMoreItems = hasMore;
      this.lastItem = newItems[newItems.length - 1];
      this.view.addItems(newItems);
    } catch (error) {
      this.view.displayErrorMessage(
        `Failed to load followers because of exception: ${error}`
      );
    }
  }
}
