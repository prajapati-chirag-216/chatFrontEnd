import React, { useRef } from "react";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import classes from "./Input.module.css";
import InputOptions from "./InputOptions";
import { TextField, useMediaQuery } from "@mui/material";

const Input = (props) => {
  const matches = useMediaQuery("(max-width:768px)");
  const inputRef = useRef();

  const changeMessageHandler = () => {
    let message = inputRef.current.querySelector("#input").value;
    if (message === "") {
      return;
    }
    props.onMessage(message);
    inputRef.current.querySelector("#input").value = "";
  };

  const sendFilesHandler = (files) => {
    props.onSendFiles(files);
  };
  const sendLocationHandler = (files) => {
    props.onSendLocation(files);
  };

  return (
    <div className={classes["input-div"]}>
      <InputOptions
        onSendFiles={sendFilesHandler}
        onSendLocation={sendLocationHandler}
      />
      <div className={classes["text-div"]}>
        <TextField
          ref={inputRef}
          id="input"
          multiline
          maxRows={4}
          placeholder="Enter Your Message..."
          autoComplete="off"
          InputProps={{
            style: {
              color: "aliceblue",
              fontSize: !matches ? "1.1rem" : "0.9rem",
              fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
              letterSpacing: "0.5px",
            },
          }}
          sx={{
            backgroundColor: "transparent",
            width: "100%",
            "& .MuiOutlinedInput-root": {
              padding: !matches ? "0.87rem" : "0.7rem",
              "& fieldset": {
                border: "none",
                outline: "none",
              },
              "&:hover fieldset": {
                border: "none",
                outline: "none",
              },
              "&.Mui-focused fieldset": {
                border: "none",
                outline: "none",
              },
            },
          }}
        />
      </div>
      <SendRoundedIcon
        sx={{
          color: "whitesmoke",
          cursor: "pointer",
          padding: !matches ? "0.8rem" : "0.68rem",
          fontSize: !matches ? "1.8rem" : "1.2rem",
          transition: "transform 100ms",
          borderRadius: "4px",
          "&:hover": {
            backgroundColor: "#33393d",
          },
        }}
        onClick={changeMessageHandler}
      />
    </div>
  );
};

export default Input;
