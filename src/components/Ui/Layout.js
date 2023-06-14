import { Container } from "@mui/system";
import { useMediaQuery } from "@mui/material";
import React from "react";

const Layout = (props) => {
  const matches = useMediaQuery("(max-width:768px)");
  return (
    <Container
      maxWidth={!matches ? "md" : "xs"}
      sx={{
        marginTop: !matches ? "15rem" : "10rem",
        boxShadow: !matches ? "2px 2px 8px black" : "1px 1px 6px black",
        borderRadius: "5px",
        display: "flex",
        flexDirection: "column",
        userSelect: "none",
        height: !matches ? "auto" : "15rem",
        boxSizing: "border-box",
      }}
    >
      {props.children}
    </Container>
  );
};

export default Layout;
