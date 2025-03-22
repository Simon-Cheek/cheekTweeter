import { Buffer } from "buffer";
import {
  AuthToken,
  FakeData,
  GetUserRequest,
  LogoutRequest,
  User,
  UserDto,
} from "tweeter-shared";
import { ServerFacade } from "../network/ServerFacade";

export class UserService {
  private serverFacade: ServerFacade = new ServerFacade();

  public async logout(authToken: AuthToken): Promise<void> {
    const req: LogoutRequest = {
      token: authToken.token,
    };
    return this.serverFacade.logoutUser(req);
  }

  public async getUser(
    authToken: AuthToken,
    alias: string
  ): Promise<User | null> {
    // TODO: Replace with the result of calling server
    // return FakeData.instance.findUserByAlias(alias);
    const req: GetUserRequest = {
      token: authToken.token,
      alias: alias,
    };
    return this.serverFacade.getUser(req);
  }

  public async getIsFollowerStatus(
    authToken: AuthToken,
    user: User,
    selectedUser: User
  ): Promise<boolean> {
    const userDto: UserDto = user.dto;
    const selectedUserDto: UserDto = selectedUser.dto;
    const req = {
      token: authToken.token,
      user: userDto,
      selectedUser: selectedUserDto,
    };
    return this.serverFacade.getIsFollowerStatus(req);
  }

  public async getFollowerCount(
    authToken: AuthToken,
    user: User
  ): Promise<number> {
    const req = {
      token: authToken.token,
      user: user.dto,
    };
    return this.serverFacade.getFollowerCount(req);
  }

  public async getFolloweeCount(
    authToken: AuthToken,
    user: User
  ): Promise<number> {
    const req = {
      token: authToken.token,
      user: user.dto,
    };
    return this.serverFacade.getFolloweeCount(req);
  }

  public async follow(
    authToken: AuthToken,
    userToFollow: User
  ): Promise<[followerCount: number, followeeCount: number]> {
    const req = {
      token: authToken.token,
      user: userToFollow.dto,
    };
    return await this.serverFacade.follow(req);
  }

  public async unfollow(
    authToken: AuthToken,
    userToUnfollow: User
  ): Promise<[followerCount: number, followeeCount: number]> {
    const req = {
      token: authToken.token,
      user: userToUnfollow.dto,
    };
    return await this.serverFacade.follow(req);
  }

  public async register(
    firstName: string,
    lastName: string,
    alias: string,
    password: string,
    userImageBytes: Uint8Array,
    imageFileExtension: string
  ): Promise<[User, AuthToken]> {
    const imageStringBase64: string =
      Buffer.from(userImageBytes).toString("base64");
    const req = {
      firstName,
      lastName,
      alias,
      password,
      imageString: imageStringBase64,
      imageFileExtension,
    };
    const [dto, token] = await this.serverFacade.register(req);
    const user = User.fromDto(dto);

    if (user === null) {
      throw new Error("Invalid registration");
    }
    const auth = new AuthToken(token, Date.now());
    return [user, auth];
  }

  public async login(
    alias: string,
    password: string
  ): Promise<[User, AuthToken]> {
    const req = {
      alias,
      password,
    };
    const [dto, token] = await this.serverFacade.login(req);
    const user = User.fromDto(dto);
    const auth = new AuthToken(token, Date.now());

    if (user === null) {
      throw new Error("Invalid alias or password");
    }
    return [user, auth];
  }
}
