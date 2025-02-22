export interface View {
  displayErrorMessage: (message: string) => void;
}
export class Presenter<T extends View> {
  private _view: T;

  public constructor(view: T) {
    this._view = view;
  }

  protected get view(): T {
    return this._view;
  }

  protected async doFailureReportingOperation(
    operation: () => Promise<void>,
    operationDesc: string
  ) {
    try {
      await operation();
    } catch (error) {
      this.view.displayErrorMessage(
        `Failed to load ${operationDesc} because of exception: ${error}`
      );
    }
  }
}
