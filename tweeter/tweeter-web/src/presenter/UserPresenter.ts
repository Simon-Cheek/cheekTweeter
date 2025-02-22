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
    try {
      if (currentUser === displayedUser) {
        this.isFollower = false;
      } else {
        this.isFollower = await this.service.getIsFollowerStatus(
          authToken!,
          currentUser!,
          displayedUser!
        );
      }
    } catch (error) {
      this.view.displayErrorMessage(
        `Failed to determine follower status because of exception: ${error}`
      );
    }
  }

  // Maybe not ?
  public async followDisplayedUser(event: React.MouseEvent): Promise<void> {
    event.preventDefault();

    try {
      this.isLoading = true;
      this.view.displayInfoMessage(
        `Following ${this.view.displayedUser!.name}...`,
        0
      );

      const [followerCount, followeeCount] = await this.service.follow(
        this.view.authToken!,
        this.view.displayedUser!
      );

      this.isFollower = true;
      this.followerCount = followerCount;
      this.followeeCount = followeeCount;
    } catch (error) {
      this.view.displayErrorMessage(
        `Failed to follow user because of exception: ${error}`
      );
    } finally {
      this.view.clearLastInfoMessage();
      this.isLoading = false;
    }
  }

  public async unfollowDisplayedUser(event: React.MouseEvent): Promise<void> {
    event.preventDefault();

    try {
      this.isLoading = true;
      this.view.displayInfoMessage(
        `Unfollowing ${this.view.displayedUser!.name}...`,
        0
      );

      const [followerCount, followeeCount] = await this.service.unfollow(
        this.view.authToken!,
        this.view.displayedUser!
      );

      this.isFollower = false;
      this.followerCount = followerCount;
      this.followeeCount = followeeCount;
    } catch (error) {
      this.view.displayErrorMessage(
        `Failed to unfollow user because of exception: ${error}`
      );
    } finally {
      this.view.clearLastInfoMessage();
      this.isLoading = false;
    }
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
