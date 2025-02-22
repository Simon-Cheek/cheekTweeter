import { Buffer } from "buffer";
import { UserService } from "../model/service/UserService";
import { AuthPresenter, AuthView } from "./AuthPresenter";

export class RegisterPresenter extends AuthPresenter {
  private userService: UserService;

  public constructor(view: AuthView) {
    super(view);
    this.userService = new UserService();
  }

  private getFileExtension(file: File): string | undefined {
    return file.name.split(".").pop();
  }

  public handleImageFile(file: File | undefined) {
    if (file) {
      this.view.setImageUrl!(URL.createObjectURL(file));

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

        this.view.setImageBytes!(new Uint8Array());
      };
      reader.readAsDataURL(file);

      // Set image file extension (and move to a separate method)
      const fileExtension = this.getFileExtension(file);
      if (fileExtension) {
        this.view.setImageFileExtension!(fileExtension);
      }
    } else {
      this.view.setImageUrl!("");
      this.view.setImageBytes!(new Uint8Array());
    }
  }

  public async doRegister(
    alias: string,
    password: string,
    rememberMe: boolean
  ) {
    try {
      this.view.setIsLoading(true);

      const [user, authToken] = await this.userService.register(
        this.view.firstName!,
        this.view.lastName!,
        alias,
        password,
        this.view.imageBytes!,
        this.view.imageFileExtension!
      );

      this.view.updateUserInfo(user, user, authToken, rememberMe);
      this.view.navigate("/");
    } catch (error) {
      this.view.displayErrorMessage(
        `Failed to register user because of exception: ${error}`
      );
    } finally {
      this.view.setIsLoading(false);
    }
  }
}
