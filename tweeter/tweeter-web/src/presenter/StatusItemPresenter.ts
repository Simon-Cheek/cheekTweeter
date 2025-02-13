import { AuthToken, Status, User } from "tweeter-shared";

export interface StatusItemView {
  addItems: (newItems: Status[]) => void;
  displayErrorMessage: (message: string) => void;
}

export abstract class StatusItemPresenter {
  private _hasMoreItems = true;
  private _lastItem: Status | null = null;
  private _view: StatusItemView;

  reset() {
    this.lastItem = null;
    this.hasMoreItems = true;
  }

  protected constructor(view: StatusItemView) {
    this._view = view;
  }

  protected get view() {
    return this._view;
  }

  protected get lastItem() {
    return this._lastItem;
  }

  protected set lastItem(lastItem: Status | null) {
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
