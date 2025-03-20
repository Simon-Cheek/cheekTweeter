import { FakeData, Status } from "tweeter-shared";
import { StatusDto } from "tweeter-shared/dist/model/dto/StatusDto";

export class StatusService {
  public async loadMoreFeedItems(
    token: string,
    userAlias: string,
    pageSize: number,
    lastItem: StatusDto | null
  ): Promise<[StatusDto[], boolean]> {
    return this.getFakeData(lastItem, pageSize);
  }

  public async loadMoreStoryItems(
    token: string,
    userAlias: string,
    pageSize: number,
    lastItem: StatusDto | null
  ): Promise<[StatusDto[], boolean]> {
    return this.getFakeData(lastItem, pageSize);
  }

  public async postStatus(
    token: string,
    newStatusDto: StatusDto
  ): Promise<void> {
    // const status: Status = Status.fromDto(newStatusDto);
  }

  private async getFakeData(
    lastItem: StatusDto | null,
    pageSize: number
  ): Promise<[StatusDto[], boolean]> {
    const [statuses, hasMore] = FakeData.instance.getPageOfStatuses(
      Status.fromDto(lastItem),
      pageSize
    );
    const dtos = statuses.map((s) => s.dto);
    return [dtos, hasMore];
  }
}
