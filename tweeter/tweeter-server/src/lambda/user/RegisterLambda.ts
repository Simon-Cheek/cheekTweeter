import { AuthResponse, RegisterRequest } from "tweeter-shared";
import { UserService } from "../../model/service/UserService";

export const handler = async (
  request: RegisterRequest
): Promise<AuthResponse> => {
  const userService = new UserService();
  const [userDto, token] = await userService.register(
    request.firstName,
    request.lastName,
    request.alias,
    request.password,
    request.imageString,
    request.imageFileExtension
  );
  return {
    user: userDto,
    token: token,
    success: true,
    message: null,
  };
};
