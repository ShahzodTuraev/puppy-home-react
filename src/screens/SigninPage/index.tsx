import React, { useEffect, useState } from "react";
import "../../scss/signup.scss";
import { Box, Button, Stack, TextField } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { Definer } from "../../app/lib/Definer";
import assert from "assert";
import MemberApiService from "../../app/apiServices/memberApiService";
import {
  sweetErrorHandling,
  sweetTopSmallSuccessAlert,
} from "../../app/lib/sweetAlert";
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

  const signupHandler = async () => {
    try {
      if (
        nickName === "" ||
        password === "" ||
        email.length < 4 ||
        !email.includes("@") ||
        !email.includes(".")
      ) {
        if (nickName === "") setNickError("Fill out this field");
        if (email === "") {
          setEmailError("Fill out this field");
        } else {
          if (email.length <= 3 || !email.includes("@") || !email.includes("."))
            setEmailError("This is invalid email address");
        }
        if (password === "") setPasswordError("Fill out this field");
      } else {
        const is_fulfilled = nickName !== "" && password !== "" && email !== "";
        assert.ok(is_fulfilled, Definer.input_err1);
        const signup_data = {
          mb_nick: nickName,
          mb_email: email,
          mb_password: password,
        };
        const mbApiService = new MemberApiService();
        await mbApiService.signupRequest(signup_data);
        navigate("/");
        sweetTopSmallSuccessAlert("Success", 1000, true);
      }
    } catch (err) {
      console.log(err);
      sweetErrorHandling(err).then();
    }
  };
  const paasswordKeyPressHandler = (e: any) => {
    if (e.key === "Enter") signupHandler().then();
  };

  return (
    <div className="signinPage">
      <Stack className="form_box">
        <h3>Create account</h3>

        <Box className="input_wrap">
          <TextField
            error={!!nickError}
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
            onKeyPress={paasswordKeyPressHandler}
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
