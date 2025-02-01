import { Link } from "react-router-dom";
import Post from "./Post";
import { UserInfoContext } from "../userInfo/UserInfoProvider";
import { useContext } from "react";
import { AuthToken, FakeData, Status, User } from "tweeter-shared";
import useToastListener from "../toaster/ToastListenerHook";

interface StatusItemInterface {
  item: Status;
}

const StatusItem = ({ item }: StatusItemInterface) => {
  const { setDisplayedUser, currentUser, authToken } =
    useContext(UserInfoContext);

  const { displayErrorMessage } = useToastListener();

  const navigateToUser = async (event: React.MouseEvent): Promise<void> => {
    event.preventDefault();

    try {
      const alias = extractAlias(event.target.toString());

      const user = await getUser(authToken!, alias);

      if (!!user) {
        if (currentUser!.equals(user)) {
          setDisplayedUser(currentUser!);
        } else {
          setDisplayedUser(user);
        }
      }
    } catch (error) {
      displayErrorMessage(`Failed to get user because of exception: ${error}`);
    }
  };

  const extractAlias = (value: string): string => {
    const index = value.indexOf("@");
    return value.substring(index);
  };

  const getUser = async (
    authToken: AuthToken,
    alias: string
  ): Promise<User | null> => {
    // TODO: Replace with the result of calling server
    return FakeData.instance.findUserByAlias(alias);
  };
  return (
    <div className="col bg-light mx-0 px-0">
      <div className="container px-0">
        <div className="row mx-0 px-0">
          <div className="col-auto p-3">
            <img
              src={item.user.imageUrl}
              className="img-fluid"
              width="80"
              alt="Posting user"
            />
          </div>
          <div className="col">
            <h2>
              <b>
                {item.user.firstName} {item.user.lastName}
              </b>{" "}
              -{" "}
              <Link
                to={item.user.alias}
                onClick={(event) => navigateToUser(event)}
              >
                {item.user.alias}
              </Link>
            </h2>
            {item.formattedDate}
            <br />
            <Post status={item} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatusItem;
