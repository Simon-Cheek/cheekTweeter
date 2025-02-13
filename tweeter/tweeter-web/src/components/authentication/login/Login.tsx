import "./Login.css";
import "bootstrap/dist/css/bootstrap.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthenticationFormLayout from "../AuthenticationFormLayout";
import useToastListener from "../../toaster/ToastListenerHook";
import AuthenticationFields from "../AuthenticationFields";
import useUserInfo from "../../userInfo/UserInfoHook";
import { LoginPresenter } from "../../../presenter/LoginPresenter";

interface Props {
  originalUrl?: string;
}

const Login = (props: Props) => {
  const [alias, setAlias] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const navigate = useNavigate();
  const { updateUserInfo } = useUserInfo();
  const { displayErrorMessage } = useToastListener();

  const listener = {
    navigate: navigate,
    updateUserInfo: updateUserInfo,
    displayErrorMessage: displayErrorMessage,
  };
  const [presenter] = useState(new LoginPresenter(listener));

  const loginOnEnter = (event: React.KeyboardEvent<HTMLElement>) => {
    if (
      event.key == "Enter" &&
      !presenter.checkSubmitButtonStatus(alias, password)
    ) {
      presenter.doLogin(alias, password, rememberMe, props.originalUrl || "");
    }
  };

  const inputFieldGenerator = () => {
    return (
      <AuthenticationFields
        onEnter={loginOnEnter}
        setAlias={setAlias}
        setPassword={setPassword}
      />
    );
  };

  const switchAuthenticationMethodGenerator = () => {
    return (
      <div className="mb-3">
        Not registered? <Link to="/register">Register</Link>
      </div>
    );
  };

  return (
    <AuthenticationFormLayout
      headingText="Please Sign In"
      submitButtonLabel="Sign in"
      oAuthHeading="Sign in with:"
      inputFieldGenerator={inputFieldGenerator}
      switchAuthenticationMethodGenerator={switchAuthenticationMethodGenerator}
      setRememberMe={setRememberMe}
      submitButtonDisabled={() =>
        presenter.checkSubmitButtonStatus(alias, password)
      }
      isLoading={presenter.isLoading}
      submit={() =>
        presenter.doLogin(alias, password, rememberMe, props.originalUrl || "")
      }
    />
  );
};

export default Login;
