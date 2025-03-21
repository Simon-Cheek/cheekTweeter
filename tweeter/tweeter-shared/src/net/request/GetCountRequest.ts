import { UserDto } from "../../model/dto/UserDto";
import { TweeterRequest } from "./TweeterRequest";

export interface GetCountRequest extends TweeterRequest {
  readonly token: string;
  readonly user: UserDto;
}
