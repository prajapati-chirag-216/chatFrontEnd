import React, { useRef } from "react";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import ShareLocationIcon from "@mui/icons-material/ShareLocation";
import classes from "./Input.module.css";
import InputOptions from "./InputOptions";
import { Button, useMediaQuery } from "@mui/material";

const Input = (props) => {
  const matches = useMediaQuery("(max-width:768px)");
  const inputRef = useRef();

  const changeMessageHandler = () => {
    const message = inputRef.current.value.trim();
    if (message === "") {
      return;
    }
    props.onMessage(message);
    inputRef.current.value = "";
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
      <input
        ref={inputRef}
        id="text-inp"
        type="text"
        placeholder="Enter Your Message..."
        autoComplete="off"
      />
      <SendRoundedIcon
        sx={{
          color: "whitesmoke",
          cursor: "pointer",
          padding: !matches ? "0.8rem" : "0.6rem",
          fontSize: !matches ? "1.8rem" : "1rem",
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
