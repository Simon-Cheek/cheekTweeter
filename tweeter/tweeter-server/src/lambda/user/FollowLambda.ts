import { FollowRequest, FollowResponse } from "tweeter-shared";
import { UserService } from "../../model/service/UserService";

export const handler = async (
  request: FollowRequest
): Promise<FollowResponse> => {
  const userService = new UserService();
  const [followerCount, followeeCount] = await userService.follow(
    request.token,
    request.user
  );
  return {
    followerCount: followerCount,
    followeeCount: followeeCount,
    success: true,
    message: null,
  };
};
