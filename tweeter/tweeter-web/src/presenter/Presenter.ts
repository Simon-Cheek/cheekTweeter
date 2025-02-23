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
        `Failed to ${operationDesc} because of exception: ${error}`
      );
    }
  }

  protected async doFailureReportFinallyOp(
    operation: () => Promise<void>,
    operationDesc: string,
    finalOperation: () => void
  ) {
    try {
      await operation();
    } catch (error) {
      this.view.displayErrorMessage(
        `Failed to ${operationDesc} because of exception: ${error}`
      );
    } finally {
      finalOperation();
    }
  }
}
