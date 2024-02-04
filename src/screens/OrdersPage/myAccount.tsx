import {
  Box,
  Button,
  FormControlLabel,
  Radio,
  Stack,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { verifyMemberData } from "../../app/apiServices/verify";
import {
  sweetFailureProvider,
  sweetTopSmallSuccessAlert,
} from "../../app/lib/sweetAlert";

const MyAccount = () => {
  /*INITIALIZATIONS*/
  const [name, setName] = useState<string>("");
  const [number, setNumber] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [code, setCode] = useState<string>("");

  /*HANDLERS*/
  const submitHandler = () => {
    if (name !== "" && number !== "" && date !== "" && code !== "") {
      setName("");
      setNumber("");
      setDate("");
      setCode("");
      sweetTopSmallSuccessAlert("New account successfully added", 1000, false);
    } else {
      sweetFailureProvider("Please fill all fields");
    }
  };
  return (
    <Stack className="account_wrap">
      <h3>Account</h3>
      <Box className="account_box">
        <Box className="card_box">
          <FormControlLabel
            value="address"
            control={<Radio checked />}
            label="Account"
          />
          <Box className="line_box">
            <h4>Cardholder:</h4>
            <p>{verifyMemberData?.mb_nick}</p>
          </Box>
          <Box className="line_box">
            <h4>Account:</h4>
            <p>...****</p>
          </Box>
          <Box className="line_box">
            <h4>Expire Date:</h4>
            <p>**/**</p>
          </Box>
        </Box>
        <Box className="add_box">
          <p className="add_title">Add Account</p>

          <Box className="input_cart">
            <TextField
              className="input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              id="outlined-basic"
              label="Cardholder Name"
              variant="outlined"
            />
            <TextField
              type="number"
              className="input"
              id="outlined-basic"
              label="Account Number"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              variant="outlined"
            />
            <Box className="hor_input">
              <TextField
                className="input"
                id="outlined-basic"
                label="Expire Date"
                variant="outlined"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
              <TextField
                type="number"
                className="input"
                id="outlined-basic"
                label="CVV"
                variant="outlined"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
            </Box>
            <img
              className="bank_cards"
              src="/images/mock-img/bankCards.png"
              alt="cards"
            />
            <Button onClick={submitHandler} className="add_account_btn">
              Add New Account
            </Button>
          </Box>
        </Box>
      </Box>
    </Stack>
  );
};

export default MyAccount;
