import { AuthToken } from "tweeter-shared";
import {
  AppNavPresenter,
  AppNavView,
} from "../../src/presenter/AppNavPresenter";
import { mock, instance, verify, when, spy } from "@typestrong/ts-mockito";
import { UserService } from "../../src/model/service/UserService";

describe("AppNavPresenter", () => {
  let appNavPresenter: AppNavPresenter;
  let mockAppNavView: AppNavView;
  let mockUserService: UserService;
  const mockAuthToken: AuthToken = new AuthToken("UserAuthtoken", 2);
  beforeEach(() => {
    mockAppNavView = mock<AppNavView>();
    const mockAppNavViewInstance = instance(mockAppNavView);

    const appNavPresenterSpy = spy(new AppNavPresenter(mockAppNavViewInstance));
    appNavPresenter = instance(appNavPresenterSpy);

    mockUserService = mock<UserService>();
    const mockUserServiceInstance = instance(mockUserService);

    when(appNavPresenterSpy.userService).thenReturn(mockUserServiceInstance);

    when(mockAppNavView.authToken).thenReturn(mockAuthToken);
  });

  it("tells the view to display a logging out message", async () => {
    await appNavPresenter.logOut();
    verify(mockAppNavView.displayInfoMessage("Logging Out...", 0)).once();
  });

  it("calls logout on the user service with the correct auth token", async () => {
    await appNavPresenter.logOut();
    verify(mockUserService.logout(mockAuthToken)).once();
  });
});
