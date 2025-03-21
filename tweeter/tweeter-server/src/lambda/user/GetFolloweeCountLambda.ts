import { GetCountRequest, GetCountResponse } from "tweeter-shared";
import { UserService } from "../../model/service/UserService";

export const handler = async (
  request: GetCountRequest
): Promise<GetCountResponse> => {
  const userService = new UserService();
  const count: number = await userService.getFolloweeCount(
    request.token,
    request.user
  );
  return {
    count: count,
    success: true,
    message: null,
  };
};
