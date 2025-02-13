import { Buffer } from "buffer";
import { UserService } from "../model/service/UserService";
import { AuthPresenter, AuthView } from "./AuthPresenter";

export class RegisterPresenter extends AuthPresenter {
  private userService: UserService;
  private _firstName: string = "";
  private _lastName: string = "";
  private imageBytes = new Uint8Array();
  private _imageUrl = "";
  private imageFileExtension = "";

  public constructor(view: AuthView) {
    super(view);
    this.userService = new UserService();
  }

  public get imageUrl() {
    return this._imageUrl;
  }

  public set imageUrl(imageUrl: string) {
    this._imageUrl = imageUrl;
  }

  public get firstName() {
    return this._firstName;
  }

  public set firstName(firstName: string) {
    this._firstName = firstName;
  }

  public get lastName() {
    return this._lastName;
  }

  public set lastName(lastName: string) {
    this._lastName = lastName;
  }

  public checkSubmitButtonStatus(alias: string, password: string): boolean {
    return (
      !this.firstName ||
      !this.lastName ||
      !alias ||
      !password ||
      !this.imageUrl ||
      !this.imageFileExtension
    );
  }

  private getFileExtension(file: File): string | undefined {
    return file.name.split(".").pop();
  }

  public handleImageFile(file: File | undefined) {
    if (file) {
      this.imageUrl = URL.createObjectURL(file);

      const reader = new FileReader();
      reader.onload = (event: ProgressEvent<FileReader>) => {
        const imageStringBase64 = event.target?.result as string;

        // Remove unnecessary file metadata from the start of the string.
        const imageStringBase64BufferContents =
          imageStringBase64.split("base64,")[1];

        const bytes: Uint8Array = Buffer.from(
          imageStringBase64BufferContents,
          "base64"
        );

        this.imageBytes = new Uint8Array(bytes); // TODO: Fix if Image Upload is wrong
      };
      reader.readAsDataURL(file);

      // Set image file extension (and move to a separate method)
      const fileExtension = this.getFileExtension(file);
      if (fileExtension) {
        this.imageFileExtension = fileExtension;
      }
    } else {
      this.imageUrl = "";
      this.imageBytes = new Uint8Array();
    }
  }

  public async doRegister(
    alias: string,
    password: string,
    rememberMe: boolean
  ) {
    try {
      this.isLoading = true;

      const [user, authToken] = await this.userService.register(
        this.firstName,
        this.lastName,
        alias,
        password,
        this.imageBytes,
        this.imageFileExtension
      );

      this.view.updateUserInfo(user, user, authToken, rememberMe);
      this.view.navigate("/");
    } catch (error) {
      this.view.displayErrorMessage(
        `Failed to register user because of exception: ${error}`
      );
    } finally {
      this.isLoading = false;
    }
  }
}
