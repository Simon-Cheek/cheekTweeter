import { TweeterResponse } from "./TweeterResponse";

export interface GetFollowerStatusResponse extends TweeterResponse {
  readonly isFollower: boolean;
}
