import React, { useEffect, useState } from "react";
import "../../scss/signup.scss";
import { Box, Button, Stack, TextField } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
// import { FullContext } from "../../app/context";
const LogIn = () => {
  /*INSTALIZATIONS*/
  const pathname = useLocation();
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [pathname]);
  // const [loginPage, setLoginPage] = useContext(FullContext);
  const [reset, setReset] = useState<boolean>(false);
  const [nickName, setNickName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [repassword, setRepassword] = useState<string>("");
  const [nickError, setNickError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [repasswordError, setRepasswordError] = useState<string>("");
  const navigate = useNavigate();
  /*HANDLERS*/
  const nameChangeHandler = (e: any) => {
    setNickName(e.target.value);
    setNickError("");
  };

  const passwordChangeHandler = (e: any) => {
    setPassword(e.target.value);
    setPasswordError("");
  };

  const repasswordChangeHandler = (e: any) => {
    setRepassword(e.target.value);
    setRepasswordError("");
  };
  const loginHandler = () => {
    if (nickName !== "" && password !== "") {
      setNickName("");
      setPassword("");
    } else {
      if (nickName === "") setNickError("Fill out this field");

      if (password === "") setPasswordError("Fill out this field");
    }
  };

  const resetHandler = () => {
    if (nickName !== "" && password !== "" && password === repassword) {
      console.log(nickName, password, repassword);

      setNickName("");
      setPassword("");
      setRepassword("");
    } else {
      if (nickName === "") setNickError("Fill out this field");

      if (password === "") {
        setPasswordError("Fill out this field");
      } else {
        if (repassword !== password)
          setRepasswordError("Passwords do not mathch");
      }
    }
  };

  return (
    <div className="signinPage">
      <Stack className="form_box">
        {reset ? <h3>Reset password</h3> : <h3>Log in</h3>}

        <Box className="input_wrap">
          <TextField
            error={!!nickError}
            color="secondary"
            className="input_area"
            id="outlined-basic"
            label="Nick name"
            variant="outlined"
            onChange={nameChangeHandler}
            size="small"
            helperText={nickError}
            value={nickName}
          />
        </Box>

        <Box className="input_wrap">
          <TextField
            color="secondary"
            className="input_area"
            onChange={passwordChangeHandler}
            id="outlined-basic"
            label="Password"
            variant="outlined"
            size="small"
            type="password"
            value={password}
            error={!!passwordError}
            helperText={passwordError}
          />
        </Box>

        {reset && (
          <Box className="input_wrap">
            <TextField
              color="secondary"
              className="input_area"
              onChange={repasswordChangeHandler}
              id="outlined-basic"
              label="Comfirm password"
              variant="outlined"
              size="small"
              type="password"
              value={repassword}
              error={!!repasswordError}
              helperText={repasswordError}
            />
          </Box>
        )}

        {!reset ? (
          <Button onClick={loginHandler} className="signup_btn">
            Log In
          </Button>
        ) : (
          <Button onClick={resetHandler} className="signup_btn">
            Reset
          </Button>
        )}
        {!reset && (
          <div className="login_text_wrap">
            <p className="link_text">
              Forget password?{" "}
              <span onClick={() => setReset(true)}>Reset password</span>
            </p>
            <p className="link_text">
              Don't have an account?{" "}
              <span
                onClick={() => {
                  navigate("/sign-up");
                }}
              >
                Sign up
              </span>
            </p>
          </div>
        )}
      </Stack>
    </div>
  );
};

export default LogIn;
