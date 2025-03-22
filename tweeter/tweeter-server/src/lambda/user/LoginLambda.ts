import { AuthResponse, LoginRequest } from "tweeter-shared";
import { UserService } from "../../model/service/UserService";

export const handler = async (request: LoginRequest): Promise<AuthResponse> => {
  const userService = new UserService();
  const [userDto, token] = await userService.login(
    request.alias,
    request.password
  );
  return {
    user: userDto,
    token: token,
    success: true,
    message: null,
  };
};
