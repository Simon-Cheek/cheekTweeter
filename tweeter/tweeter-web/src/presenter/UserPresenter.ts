import { AuthToken, User } from "tweeter-shared";
import { UserService } from "../model/service/UserService";
import { Presenter, View } from "./Presenter";

export interface UserView extends View {
  displayInfoMessage: (message: string, duration: number) => void;
  clearLastInfoMessage: () => void;
  currentUser: User | null;
  authToken: AuthToken | null;
  displayedUser: User | null;
  setDisplayedUser: (user: User) => void;
}

export class UserPresenter extends Presenter<UserView> {
  private _isFollower: boolean = false;
  private _followeeCount: number = -1;
  private _followerCount: number = -1;
  private _isLoading: boolean = false;
  private service: UserService;

  public get isFollower() {
    return this._isFollower;
  }

  public set isFollower(isFollower: boolean) {
    this._isFollower = isFollower;
  }

  public get isLoading() {
    return this._isLoading;
  }

  public set isLoading(isLoading: boolean) {
    this._isLoading = isLoading;
  }

  public get followeeCount() {
    return this._followeeCount;
  }

  public set followeeCount(followeeCount: number) {
    this._followeeCount = followeeCount;
  }

  public set followerCount(followerCount: number) {
    this._followerCount = followerCount;
  }

  public get followerCount() {
    return this._followerCount;
  }

  constructor(view: UserView) {
    super(view);
    this.service = new UserService();
  }

  public async setIsFollowerStatus(
    authToken: AuthToken,
    currentUser: User,
    displayedUser: User
  ) {
    this.doFailureReportingOperation(async () => {
      if (currentUser === displayedUser) {
        this.isFollower = false;
      } else {
        this.isFollower = await this.service.getIsFollowerStatus(
          authToken!,
          currentUser!,
          displayedUser!
        );
      }
    }, "determine follower status");
  }

  private actOnDisplayedUser(
    action: (auth: AuthToken, user: User) => Promise<[number, number]>,
    isFollower: boolean,
    actionDesc: string
  ) {
    this.doFailureReportFinallyOp(
      async () => {
        this.isLoading = true;
        this.view.displayInfoMessage(
          `${actionDesc}ing ${this.view.displayedUser!.name}...`,
          0
        );
        const [followerCount, followeeCount] = await action(
          this.view.authToken!,
          this.view.displayedUser!
        );
        this.isFollower = isFollower;
        this.followerCount = followerCount;
        this.followeeCount = followeeCount;
      },
      `${actionDesc} user`,
      () => {
        this.view.clearLastInfoMessage();
        this.isLoading = false;
      }
    );
  }

  public async followDisplayedUser(event: React.MouseEvent): Promise<void> {
    event.preventDefault();
    this.actOnDisplayedUser(
      async () => {
        return this.service.follow(
          this.view.authToken!,
          this.view.displayedUser!
        );
      },
      true,
      "follow"
    );
  }

  public async unfollowDisplayedUser(event: React.MouseEvent): Promise<void> {
    event.preventDefault();
    this.actOnDisplayedUser(
      async () => {
        return this.service.unfollow(
          this.view.authToken!,
          this.view.displayedUser!
        );
      },
      false,
      "unfollow"
    );
  }

  public async setNumbFollowers(authToken: AuthToken, displayedUser: User) {
    this.doFailureReportingOperation(async () => {
      this.followerCount = await this.service.getFollowerCount(
        authToken,
        displayedUser
      );
    }, "followers count");
  }

  public async setNumbFollowees(authToken: AuthToken, displayedUser: User) {
    this.doFailureReportingOperation(async () => {
      this.followeeCount = await this.service.getFolloweeCount(
        authToken,
        displayedUser
      );
    }, "followees count");
  }
}
