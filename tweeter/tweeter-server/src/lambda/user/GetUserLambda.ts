import { GetUserRequest, GetUserResponse, UserDto } from "tweeter-shared";
import { UserService } from "../../model/service/UserService";

export const handler = async (
  request: GetUserRequest
): Promise<GetUserResponse> => {
  const userService = new UserService();
  const dto: UserDto | null = await userService.getUser(
    request.token,
    request.alias
  );
  return {
    user: dto,
    success: true,
    message: null,
  };
};
