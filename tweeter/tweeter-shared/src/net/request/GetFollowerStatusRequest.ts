import { UserDto } from "../../model/dto/UserDto";
import { TweeterRequest } from "./TweeterRequest";

export interface GetFollowerStatusRequest extends TweeterRequest {
  readonly token: string;
  readonly user: UserDto;
  readonly selectedUser: UserDto;
}
