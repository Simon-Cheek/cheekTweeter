import { AuthToken } from "tweeter-shared";
import { Presenter, View } from "./Presenter";

export interface PagedView<T> extends View {
  addItems: (newItems: T[]) => void;
}
export abstract class PagedPresenter<T> extends Presenter<PagedView<T>> {
  private _hasMoreItems = true;
  private _lastItem: T | null = null;

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

  public abstract loadMoreItems(authToken: AuthToken, userAlias: string): void;
}
