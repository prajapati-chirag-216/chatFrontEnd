import React from "react";
import { Typography, useMediaQuery } from "@mui/material";
import logo from "../../assests/app-logo.svg";
import ListIcon from "@mui/icons-material/List";
import classes from "./Header.module.css";

const Header = (props) => {
  const matches = useMediaQuery("(max-width:768px)");
  return (
    <div className={classes["header-div"]}>
      <img src={logo} className={classes["app-logo"]} alt="" />
      <Typography
        color="whitesmoke"
        letterSpacing={!matches ? "2px" : "1px"}
        textTransform="uppercase"
        marginLeft={!matches ? "5px" : "2px"}
        sx={{ fontSize: !matches ? "2rem" : "1.2rem" }}
      >
        {props.userData ? props.userData.name : "Chat Room"}
      </Typography>
      {matches && (
        <ListIcon
          fontSize={!matches ? "large" : "medium"}
          sx={{
            color: "whitesmoke",
            marginLeft: "auto",
            cursor: "pointer",
            transition: "all 100ms",
            padding: "0.5rem",
            borderRadius: "4px",
            "&:hover": {
              backgroundColor: "#33393d",
            },
          }}
          onClick={props.onClick}
        />
      )}
    </div>
  );
};

export default Header;
