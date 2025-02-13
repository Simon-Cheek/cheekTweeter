import { AuthToken, User } from "tweeter-shared";

export interface UserItemView {
  addItems: (newItems: User[]) => void;
  displayErrorMessage: (message: string) => void;
}

export abstract class UserItemPresenter {
  private _hasMoreItems = true;
  private _lastItem: User | null = null;
  private _view: UserItemView;

  reset() {
    this.lastItem = null;
    this.hasMoreItems = true;
  }

  protected constructor(view: UserItemView) {
    this._view = view;
  }

  protected get view() {
    return this._view;
  }

  protected get lastItem() {
    return this._lastItem;
  }

  protected set lastItem(lastItem: User | null) {
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
