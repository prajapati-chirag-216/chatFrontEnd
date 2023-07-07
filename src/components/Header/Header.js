import React, { Fragment } from "react";
import { Divider, Typography, useMediaQuery } from "@mui/material";
import logo from "../../assests/app-logo.svg";
import classes from "./Header.module.css";
const Header = () => {
  const matches = useMediaQuery("(max-width:768px)");

  return (
    <Fragment>
      <Typography
        variant="h3"
        sx={{
          fontSize: !matches ? "2.8rem" : "1.6rem",
          fontWeight: "bold",
          textTransform: "uppercase",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          letterSpacing: !matches ? "1px" : "0.5px",
          gap: !matches ? "1.3rem" : "1rem",
          padding: !matches ? "1.2rem" : "0.8rem",
        }}
      >
        <img src={logo} className={classes["chat-logo"]} />
        InterChat
      </Typography>
      <Divider
        sx={{
          border: !matches ? "2px solid black" : "1px solid black",
          marginBottom: !matches ? "2rem" : "0.7rem",
          width: "100%",
          alignSelf: "center",
        }}
      />
    </Fragment>
  );
};

export default Header;
