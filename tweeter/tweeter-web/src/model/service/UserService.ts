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
    // Not neded now, but will be needed when you make the request to the server in milestone 3
    const imageStringBase64: string =
      Buffer.from(userImageBytes).toString("base64");

    // TODO: Replace with the result of calling the server
    const user = FakeData.instance.firstUser;

    if (user === null) {
      throw new Error("Invalid registration");
    }

    return [user, FakeData.instance.authToken];
  }

  public async login(
    alias: string,
    password: string
  ): Promise<[User, AuthToken]> {
    // TODO: Replace with the result of calling the server
    const user = FakeData.instance.firstUser;

    if (user === null) {
      throw new Error("Invalid alias or password");
    }

    return [user, FakeData.instance.authToken];
  }
}
