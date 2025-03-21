import {
  FollowRequest,
  FollowResponse,
  GetCountRequest,
  GetCountResponse,
  GetFollowerStatusRequest,
  GetFollowerStatusResponse,
  GetUserRequest,
  GetUserResponse,
  LogoutRequest,
  PagedStatusItemRequest,
  PagedStatusItemResponse,
  PagedUserItemRequest,
  PagedUserItemResponse,
  PostStatusRequest,
  Status,
  TweeterResponse,
  User,
  UserDto,
} from "tweeter-shared";
import { ClientCommunicator } from "./ClientCommunicator";

export class ServerFacade {
  private SERVER_URL =
    "https://rygy5ml9j0.execute-api.us-east-1.amazonaws.com/V9";

  private clientCommunicator = new ClientCommunicator(this.SERVER_URL);

  public async getMoreFollowees(
    request: PagedUserItemRequest
  ): Promise<[User[], boolean]> {
    const response = await this.clientCommunicator.doPost<
      PagedUserItemRequest,
      PagedUserItemResponse
    >(request, "/get-followees");

    // Convert the UserDto array returned by ClientCommunicator to a User array
    const items: User[] | null =
      response.success && response.items
        ? response.items.map((dto) => User.fromDto(dto) as User)
        : null;

    // Handle errors
    if (response.success) {
      if (items == null) {
        throw new Error(`No followees found`);
      } else {
        return [items, response.hasMore];
      }
    } else {
      console.error(response);
      throw new Error(response.message ? response.message : "");
    }
  }
  public async getMoreFollowers(
    request: PagedUserItemRequest
  ): Promise<[User[], boolean]> {
    const response = await this.clientCommunicator.doPost<
      PagedUserItemRequest,
      PagedUserItemResponse
    >(request, "/get-followers");

    // Convert the UserDto array returned by ClientCommunicator to a User array
    const items: User[] | null =
      response.success && response.items
        ? response.items.map((dto) => User.fromDto(dto) as User)
        : null;

    // Handle errors
    if (response.success) {
      if (items == null) {
        throw new Error(`No followers found`);
      } else {
        return [items, response.hasMore];
      }
    } else {
      console.error(response);
      throw new Error(response.message ? response.message : "");
    }
  }

  public async loadMoreStoryItems(
    request: PagedStatusItemRequest
  ): Promise<[Status[], boolean]> {
    const response = await this.clientCommunicator.doPost<
      PagedStatusItemRequest,
      PagedStatusItemResponse
    >(request, "/load-story-items");

    // Convert the StatusDto array returned by ClientCommunicator to a Status array
    const items: Status[] | null =
      response.success && response.items
        ? response.items.map((dto) => Status.fromDto(dto) as Status)
        : null;

    // Handle errors
    if (response.success) {
      if (items == null) {
        throw new Error(`No story items found`);
      } else {
        return [items, response.hasMore];
      }
    } else {
      console.error(response);
      throw new Error(response.message ? response.message : "");
    }
  }

  public async loadMoreFeedItems(
    request: PagedStatusItemRequest
  ): Promise<[Status[], boolean]> {
    const response = await this.clientCommunicator.doPost<
      PagedStatusItemRequest,
      PagedStatusItemResponse
    >(request, "/load-feed-items");

    // Convert the StatusDto array returned by ClientCommunicator to a Status array
    const items: Status[] | null =
      response.success && response.items
        ? response.items.map((dto) => Status.fromDto(dto) as Status)
        : null;

    // Handle errors
    if (response.success) {
      if (items == null) {
        throw new Error(`No feed items found`);
      } else {
        return [items, response.hasMore];
      }
    } else {
      console.error(response);
      throw new Error(response.message ? response.message : "");
    }
  }

  public async postStatus(request: PostStatusRequest): Promise<void> {
    const response = await this.clientCommunicator.doPost<
      PostStatusRequest,
      TweeterResponse
    >(request, "/post-status");

    // Handle errors
    if (response.success) {
      return;
    } else {
      console.error(response);
      throw new Error(response.message ? response.message : "");
    }
  }

  public async logoutUser(request: LogoutRequest): Promise<void> {
    const response = await this.clientCommunicator.doPost<
      LogoutRequest,
      TweeterResponse
    >(request, "/logout");
    // Handle errors
    if (response.success) {
      return;
    } else {
      console.error(response);
      throw new Error(response.message ? response.message : "");
    }
  }

  public async getUser(request: GetUserRequest): Promise<User | null> {
    const response = await this.clientCommunicator.doPost<
      GetUserRequest,
      GetUserResponse
    >(request, "/get-user");
    // Handle errors
    if (response.success) {
      const dto: UserDto | null = response.user;
      const user: User | null = User.fromDto(dto);
      return user;
    } else {
      console.error(response);
      throw new Error(response.message ? response.message : "");
    }
  }

  public async getFolloweeCount(request: GetCountRequest): Promise<number> {
    const response = await this.clientCommunicator.doPost<
      GetCountRequest,
      GetCountResponse
    >(request, "/get-followee-count");
    // Handle errors
    if (response.success) {
      return response.count;
    } else {
      console.error(response);
      throw new Error(response.message ? response.message : "");
    }
  }

  public async getFollowerCount(request: GetCountRequest): Promise<number> {
    const response = await this.clientCommunicator.doPost<
      GetCountRequest,
      GetCountResponse
    >(request, "/get-follower-count");
    // Handle errors
    if (response.success) {
      return response.count;
    } else {
      console.error(response);
      throw new Error(response.message ? response.message : "");
    }
  }

  public async getIsFollowerStatus(
    request: GetFollowerStatusRequest
  ): Promise<boolean> {
    const response = await this.clientCommunicator.doPost<
      GetFollowerStatusRequest,
      GetFollowerStatusResponse
    >(request, "/get-is-follower-status");
    // Handle errors
    if (response.success) {
      return response.isFollower;
    } else {
      console.error(response);
      throw new Error(response.message ? response.message : "");
    }
  }

  public async follow(request: FollowRequest): Promise<[number, number]> {
    const response = await this.clientCommunicator.doPost<
      FollowRequest,
      FollowResponse
    >(request, "/follow");
    // Handle errors
    if (response.success) {
      return [response.followerCount, response.followeeCount];
    } else {
      console.error(response);
      throw new Error(response.message ? response.message : "");
    }
  }

  public async unfollow(request: FollowRequest): Promise<[number, number]> {
    const response = await this.clientCommunicator.doPost<
      FollowRequest,
      FollowResponse
    >(request, "/unfollow");
    // Handle errors
    if (response.success) {
      return [response.followerCount, response.followeeCount];
    } else {
      console.error(response);
      throw new Error(response.message ? response.message : "");
    }
  }
}
