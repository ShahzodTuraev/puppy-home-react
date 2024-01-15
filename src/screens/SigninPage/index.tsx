import React, { useContext, useEffect, useState } from "react";
import "../../scss/signup.scss";
import { Box, Button, Stack, TextField } from "@mui/material";
import { FullContext } from "../../app/context";
import { useLocation, useNavigate } from "react-router-dom";
const SignUp = () => {
  /*INSTALIZATIONS*/
  const [nickName, setNickName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [nickError, setNickError] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const navigate = useNavigate();
  const pathname = useLocation();
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [pathname]);
  /*HANDLERS*/
  const nameChangeHandler = (e: any) => {
    setNickName(e.target.value);
    setNickError("");
  };
  const emailChangeHandler = (e: any) => {
    setEmail(e.target.value);
    setEmailError("");
  };
  const passwordChangeHandler = (e: any) => {
    setPassword(e.target.value);
    setPasswordError("");
  };

  const signupHandler = () => {
    if (
      nickName !== "" &&
      password !== "" &&
      email.length > 3 &&
      email.includes("@") &&
      email.includes(".")
    ) {
      setNickName("");
      setEmail("");
      setPassword("");
    } else {
      if (nickName === "") setNickError("Fill out this field");
      if (email === "") {
        setEmailError("Fill out this field");
      } else {
        if (email.length <= 3 || !email.includes("@") || !email.includes("."))
          setEmailError("This is invalid email address");
      }
      if (password === "") setPasswordError("Fill out this field");
    }
  };

  return (
    <div className="signinPage">
      <Stack className="form_box">
        <h3>Create account</h3>

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
            defaultValue={null}
            helperText={nickError}
            value={nickName}
          />
        </Box>

        <Box className="input_wrap">
          <TextField
            color="secondary"
            className="input_area"
            onChange={emailChangeHandler}
            id="outlined-basic"
            label="Email address"
            variant="outlined"
            size="small"
            type="email"
            error={!!emailError}
            helperText={emailError}
            value={email}
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
            error={!!passwordError}
            helperText={passwordError}
            value={password}
          />
        </Box>

        <Button onClick={signupHandler} className="signup_btn">
          Sign Up
        </Button>

        <p className="link_text">
          Already have an account?{" "}
          <span
            onClick={() => {
              navigate("/log-in");
            }}
          >
            Log in
          </span>
        </p>
      </Stack>
    </div>
  );
};

export default SignUp;
