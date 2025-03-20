import {
  AuthToken,
  FakeData,
  PagedUserItemRequest,
  User,
  UserDto,
} from "tweeter-shared";
import { ServerFacade } from "../network/ServerFacade";

export class FollowService {
  private serverFacade = new ServerFacade();

  public async loadMoreFollowers(
    authToken: AuthToken,
    userAlias: string,
    pageSize: number,
    lastItem: User | null
  ): Promise<[User[], boolean]> {
    // TODO: Replace with the result of calling server
    const req: PagedUserItemRequest = {
      token: authToken.token,
      userAlias: userAlias,
      pageSize: pageSize,
      lastItem: lastItem,
    };
    return await this.serverFacade.getMoreFollowers(req);
  }

  public async loadMoreFollowees(
    authToken: AuthToken,
    userAlias: string,
    pageSize: number,
    lastItem: User | null
  ): Promise<[User[], boolean]> {
    // TODO: Replace with the result of calling server
    const req: PagedUserItemRequest = {
      token: authToken.token,
      userAlias: userAlias,
      pageSize: pageSize,
      lastItem: lastItem,
    };
    return await this.serverFacade.getMoreFollowees(req);
  }
}
