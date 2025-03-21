import { Buffer } from "buffer";
import { AuthToken, FakeData, User, UserDto } from "tweeter-shared";

export class UserService {
  public async logout(token: string): Promise<void> {}

  public async getUser(token: string, alias: string): Promise<UserDto | null> {
    const user = FakeData.instance.findUserByAlias(alias);
    return user?.dto || null;
  }

  public async getIsFollowerStatus(
    token: string,
    user: UserDto,
    selectedUser: UserDto
  ): Promise<boolean> {
    // TODO: Replace with the result of calling server
    const fullUser = User.fromDto(user);
    const fullSelectedUser = User.fromDto(selectedUser);
    return FakeData.instance.isFollower();
  }

  public async getFollowerCount(token: string, user: UserDto): Promise<number> {
    // TODO: Replace with the result of calling server
    return FakeData.instance.getFollowerCount(user.alias);
  }

  public async getFolloweeCount(token: string, user: UserDto): Promise<number> {
    // TODO: Replace with the result of calling server
    return FakeData.instance.getFolloweeCount(user.alias);
  }

  public async follow(
    token: string,
    userToFollow: UserDto
  ): Promise<[followerCount: number, followeeCount: number]> {
    const followerCount = await this.getFollowerCount(token, userToFollow);
    const followeeCount = await this.getFolloweeCount(token, userToFollow);

    return [followerCount, followeeCount];
  }

  public async unfollow(
    token: string,
    userToUnfollow: UserDto
  ): Promise<[followerCount: number, followeeCount: number]> {
    const followerCount = await this.getFollowerCount(token, userToUnfollow);
    const followeeCount = await this.getFolloweeCount(token, userToUnfollow);

    return [followerCount, followeeCount];
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
