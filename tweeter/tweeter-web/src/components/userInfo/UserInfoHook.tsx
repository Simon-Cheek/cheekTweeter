import { useContext } from "react";
import { UserInfoContext } from "./UserInfoProvider";

const useUserInfo = () => {
  const userInfoContext = useContext(UserInfoContext);

  return { ...userInfoContext };
};

export default useUserInfo;
