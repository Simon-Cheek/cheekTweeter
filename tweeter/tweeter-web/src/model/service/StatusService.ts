import { AuthToken, PagedStatusItemRequest, Status } from "tweeter-shared";
import { ServerFacade } from "../network/ServerFacade";
import { StatusDto } from "tweeter-shared/dist/model/dto/StatusDto";

export class StatusService {
  private serverFacade = new ServerFacade();

  public async loadMoreFeedItems(
    authToken: AuthToken,
    userAlias: string,
    pageSize: number,
    lastItem: Status | null
  ): Promise<[Status[], boolean]> {
    const lastItemDto: StatusDto | null = lastItem?.dto || null;
    const req: PagedStatusItemRequest = {
      token: authToken.token,
      userAlias: userAlias,
      pageSize: pageSize,
      lastItem: lastItemDto,
    };
    return this.serverFacade.loadMoreFeedItems(req);
  }

  public async loadMoreStoryItems(
    authToken: AuthToken,
    userAlias: string,
    pageSize: number,
    lastItem: Status | null
  ): Promise<[Status[], boolean]> {
    const lastItemDto: StatusDto | null = lastItem?.dto || null;
    const req: PagedStatusItemRequest = {
      token: authToken.token,
      userAlias: userAlias,
      pageSize: pageSize,
      lastItem: lastItemDto,
    };
    return this.serverFacade.loadMoreStoryItems(req);
  }

  public async postStatus(
    authToken: AuthToken,
    newStatus: Status
  ): Promise<void> {
    // Pause so we can see the logging out message. Remove when connected to the server
    await new Promise((f) => setTimeout(f, 2000));

    // TODO: Call the server to post the status
  }
}
