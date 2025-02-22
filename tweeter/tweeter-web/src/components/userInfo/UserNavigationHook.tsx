import { AuthToken, User } from "tweeter-shared";
import useToastListener from "../toaster/ToastListenerHook";
import useUserInfo from "./UserInfoHook";
import { UserService } from "../../model/service/UserService";
import { UserNavigationPresenter } from "../../presenter/UserNavigationPresenter";

const useUserNavigation = () => {
  const { setDisplayedUser, currentUser, authToken } = useUserInfo();
  const { displayErrorMessage } = useToastListener();
  const userService = new UserService();

  const listener = {
    setDisplayedUser,
    currentUser,
    authToken,
    displayErrorMessage,
  };

  const presenter = new UserNavigationPresenter(listener);
  const navigateToUser = presenter.navigateToUser;
  const extractAlias = presenter.extractAlias;
  const getUser = presenter.getUser;

  return { navigateToUser, extractAlias, getUser };
};

export default useUserNavigation;
