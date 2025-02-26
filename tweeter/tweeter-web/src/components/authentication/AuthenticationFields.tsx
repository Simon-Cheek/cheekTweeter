import { SetStateAction } from "react";

interface AuthFieldsInterface {
  onEnter: React.KeyboardEventHandler<HTMLInputElement>;
  setAlias: React.Dispatch<SetStateAction<string>>;
  setPassword: React.Dispatch<SetStateAction<string>>;
}

const AuthenticationFields = ({
  onEnter,
  setAlias,
  setPassword,
}: AuthFieldsInterface) => {
  return (
    <>
      <div className="form-floating">
        <input
          type="text"
          className="form-control"
          size={50}
          id="aliasInput"
          aria-label="alias"
          placeholder="name@example.com"
          onKeyDown={onEnter}
          onChange={(event) => setAlias(event.target.value)}
        />
        <label htmlFor="aliasInput">Alias</label>
      </div>
      <div className="form-floating">
        <input
          type="password"
          className="form-control"
          id="passwordInput"
          aria-label="password"
          placeholder="Password"
          onKeyDown={onEnter}
          onChange={(event) => setPassword(event.target.value)}
        />
        <label htmlFor="passwordInput">Password</label>
      </div>
    </>
  );
};

export default AuthenticationFields;
