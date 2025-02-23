import { Buffer } from "buffer";
import { UserService } from "../model/service/UserService";
import { AuthPresenter, AuthView } from "./AuthPresenter";

export class RegisterPresenter extends AuthPresenter {
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

  protected async handleAuth(alias: string, password: string) {
    return this.userService.register(
      this.view.firstName!,
      this.view.lastName!,
      alias,
      password,
      this.view.imageBytes!,
      this.view.imageFileExtension!
    );
  }

  protected handleNavigation(): void {
    this.view.navigate("/");
  }

  protected getActionDesc() {
    return "register user";
  }

  public async doRegister(
    alias: string,
    password: string,
    rememberMe: boolean
  ) {
    this.doAuthenticate(alias, password, rememberMe);
  }
}
