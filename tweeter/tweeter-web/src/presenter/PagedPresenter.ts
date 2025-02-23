import { AuthToken } from "tweeter-shared";
import { Presenter, View } from "./Presenter";

export const PAGE_SIZE = 10;
export interface PagedView<T> extends View {
  addItems: (newItems: T[]) => void;
}
export abstract class PagedPresenter<T, U> extends Presenter<PagedView<T>> {
  private _hasMoreItems = true;
  private _lastItem: T | null = null;
  protected service: U;

  constructor(view: PagedView<T>) {
    super(view);
    this.service = this.createService();
  }

  protected abstract createService(): U;

  public reset() {
    this.lastItem = null;
    this.hasMoreItems = true;
  }

  protected get lastItem() {
    return this._lastItem;
  }

  protected set lastItem(lastItem: T | null) {
    this._lastItem = lastItem;
  }

  public get hasMoreItems() {
    return this._hasMoreItems;
  }

  protected set hasMoreItems(hasMoreItems: boolean) {
    this._hasMoreItems = hasMoreItems;
  }

  protected abstract getItemDescription(): string;

  protected abstract getMoreItems(
    authToken: AuthToken,
    userAlias: string
  ): Promise<[T[], boolean]>;

  public async loadMoreItems(authToken: AuthToken, userAlias: string) {
    this.doFailureReportingOperation(async () => {
      const [newItems, hasMore] = await this.getMoreItems(
        authToken!,
        userAlias
      );

      this.hasMoreItems = hasMore;
      this.lastItem = newItems[newItems.length - 1];
      this.view.addItems(newItems);
    }, this.getItemDescription());
  }
}
