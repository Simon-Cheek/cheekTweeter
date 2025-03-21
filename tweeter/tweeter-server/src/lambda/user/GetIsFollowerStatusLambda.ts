import {
  GetFollowerStatusRequest,
  GetFollowerStatusResponse,
} from "tweeter-shared";
import { UserService } from "../../model/service/UserService";

export const handler = async (
  request: GetFollowerStatusRequest
): Promise<GetFollowerStatusResponse> => {
  const userService = new UserService();
  const followerStatus: boolean = await userService.getIsFollowerStatus(
    request.token,
    request.user,
    request.selectedUser
  );
  return {
    isFollower: followerStatus,
    success: true,
    message: null,
  };
};
