import { MemoryRouter } from "react-router-dom";
import Login from "../../../src/components/authentication/login/Login";
import { render, screen } from "@testing-library/react";
import React from "react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { LoginPresenter } from "../../../src/presenter/LoginPresenter";
import PostStatus from "../../../src/components/postStatus/PostStatus";
import { instance, mock, verify, when } from "@typestrong/ts-mockito";
import { PostStatusPresenter } from "../../../src/presenter/PostStatusPresenter";
import useUserInfo from "../../../src/components/userInfo/UserInfoHook";
import { AuthToken, User } from "tweeter-shared";

library.add(fab);

jest.mock("../../../src/components/userInfo/UserInfoHook", () => ({
  ...jest.requireActual("../../../src/components/userInfo/UserInfoHook"),
  __esModule: true,
  default: jest.fn(),
}));

beforeAll(() => {
  const mockUser = mock<User>();
  const mockUserInstance = instance(mockUser);
  const mockAuthToken = mock<AuthToken>();
  const mockAuthTokenInstance = instance(mockAuthToken);
  (useUserInfo as jest.Mock).mockReturnValue({
    currentUser: mockUserInstance,
    authToken: mockAuthTokenInstance,
  });
});

describe("Login component", () => {
  it("has disabled buttons upon initialization", () => {
    const { postButton, clearButton } = renderPostStatusAndGetElement();
    expect(postButton).toBeDisabled();
    expect(clearButton).toBeDisabled();
  });

  it("enables buttons when textfield is typed in", async () => {
    const { postButton, clearButton, textArea, user } =
      renderPostStatusAndGetElement();
    expect(postButton).toBeDisabled();
    expect(clearButton).toBeDisabled();
    await user.type(textArea, "a");
    expect(postButton).toBeEnabled();
    expect(clearButton).toBeEnabled();
  });

  it("disabled buttons when textfield is cleared", async () => {
    const { postButton, clearButton, textArea, user } =
      renderPostStatusAndGetElement();
    expect(postButton).toBeDisabled();
    expect(clearButton).toBeDisabled();
    await user.type(textArea, "a");
    expect(postButton).toBeEnabled();
    expect(clearButton).toBeEnabled();
    await user.clear(textArea);
    expect(postButton).toBeDisabled();
    expect(clearButton).toBeDisabled();
  });

  it("calls the mock presenter when the post status button is pressed", async () => {
    const mockPresenter = mock<PostStatusPresenter>();
    const mockPresenterInstance = instance(mockPresenter);
    when(mockPresenter.isLoading).thenReturn(false);
    const { postButton, textArea, user } = renderPostStatusAndGetElement(
      mockPresenterInstance
    );

    await user.type(textArea, "words");
    await user.click(postButton);
    await new Promise((resolve) => setTimeout(resolve, 10)); // Tests are flaky without slight delay

    verify(mockPresenter.submitPost()).once();
  });
});

const renderPostStatus = (presenter?: PostStatusPresenter) => {
  return render(
    <MemoryRouter>
      {!!presenter ? <PostStatus pres={presenter} /> : <PostStatus />}
    </MemoryRouter>
  );
};

const renderPostStatusAndGetElement = (presenter?: PostStatusPresenter) => {
  const user = userEvent.setup();
  renderPostStatus(presenter);

  const textArea = screen.getByRole("textbox");
  const postButton = screen.getByRole("button", { name: /Post Status/i });
  const clearButton = screen.getByRole("button", { name: /Clear/i });

  return { textArea, clearButton, postButton, user };
};
