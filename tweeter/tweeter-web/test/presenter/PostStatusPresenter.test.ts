import { AuthToken } from "tweeter-shared";
import {
  PostStatusPresenter,
  PostStatusView,
} from "../../src/presenter/PostStatusPresenter";
import {
  mock,
  instance,
  verify,
  when,
  spy,
  capture,
  anything,
} from "@typestrong/ts-mockito";
import { StatusService } from "../../src/model/service/StatusService";

describe("postStatusPresenter", () => {
  let postStatusPresenter: PostStatusPresenter;
  let mockPostStatusView: PostStatusView;
  let mockStatusService: StatusService;
  const mockAuthToken: AuthToken = new AuthToken("UserAuthtoken", 2);

  beforeEach(() => {
    mockPostStatusView = mock<PostStatusView>();
    const mockPostStatusViewInstance = instance(mockPostStatusView);

    const postStatusPresenterSpy = spy(
      new PostStatusPresenter(mockPostStatusViewInstance)
    );
    postStatusPresenter = instance(postStatusPresenterSpy);

    mockStatusService = mock<StatusService>();
    const mockStatusServiceInstance = instance(mockStatusService);
    when(postStatusPresenterSpy.service).thenReturn(mockStatusServiceInstance);

    // mock view properties
    when(mockPostStatusView.authToken).thenReturn(mockAuthToken);
    when(mockPostStatusView.post).thenReturn("Post");
    when(mockPostStatusView.currentUser).thenReturn(null);
  });

  it("displays info message on post", async () => {
    await postStatusPresenter.submitPost();
    verify(
      mockPostStatusView.displayInfoMessage("Posting status...", 0)
    ).once();
  });

  it("calls postStatus on the StatusService with the correct parameters", async () => {
    await postStatusPresenter.submitPost();
    const [authTokenTest, statusTest] = capture(
      mockStatusService.postStatus
    ).first();
    expect(authTokenTest).toBe(mockAuthToken);
    expect(statusTest?.post).toBe("Post");
  });

  it("clears the last info message / post and displays a status upon status post", async () => {
    await postStatusPresenter.submitPost();
    await new Promise((resolve) => setTimeout(resolve, 10)); // Tests are flaky without slight delay
    verify(mockPostStatusView.setPost("")).once();
    verify(
      mockPostStatusView.displayInfoMessage("Status posted!", 2000)
    ).once();
    verify(mockPostStatusView.clearLastInfoMessage()).once();
  });

  it("displays error message and does not call other methods on failure", async () => {
    const error = new Error("Mock error");
    when(mockStatusService.postStatus(anything(), anything())).thenThrow(error);
    await postStatusPresenter.submitPost();
    await new Promise((resolve) => setTimeout(resolve, 10)); // Tests are flaky without slight delay
    verify(mockPostStatusView.setPost("")).never();
    verify(
      mockPostStatusView.displayInfoMessage("Status posted!", 2000)
    ).never();
    verify(mockPostStatusView.displayErrorMessage(anything())).once();
  });
});
