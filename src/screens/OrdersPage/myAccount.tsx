import {
  Box,
  Button,
  FormControlLabel,
  Radio,
  Stack,
  TextField,
} from "@mui/material";
import React from "react";
import { verifyMemberData } from "../../app/apiServices/verify";

const MyAccount = () => {
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
            <p>...5498</p>
          </Box>
          <Box className="line_box">
            <h4>Expire Date:</h4>
            <p>07/26</p>
          </Box>
        </Box>
        <Box className="add_box">
          <p className="add_title">Add Account</p>

          <Box className="input_cart">
            <TextField
              className="input"
              id="outlined-basic"
              label="Cardholder Name"
              variant="outlined"
            />
            <TextField
              type="number"
              className="input"
              id="outlined-basic"
              label="Account Number"
              variant="outlined"
            />
            <Box className="hor_input">
              <TextField
                className="input"
                id="outlined-basic"
                label="Expire Date"
                variant="outlined"
              />
              <TextField
                type="number"
                className="input"
                id="outlined-basic"
                label="CVV"
                variant="outlined"
              />
            </Box>
            <img
              className="bank_cards"
              src="/images/mock-img/bankCards.png"
              alt="cards"
            />
            <Button className="add_account_btn">Add New Account</Button>
          </Box>
        </Box>
      </Box>
    </Stack>
  );
};

export default MyAccount;
