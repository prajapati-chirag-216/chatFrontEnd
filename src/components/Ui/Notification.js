import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import classes from "./Notification.module.css";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import TaskAltIcon from "@mui/icons-material/TaskAlt";

const ModalOverlay = (props) => (
  <div
    className={`${classes.card} ${classes.modal} ${classes.hideMe} ${
      props.status === "message"
        ? classes.message
        : props.status === "invalid"
        ? classes.invalid
        : classes.success
    }

    `}
  >
    <div className={classes.content}>
      {props.status === "message" ? (
        <span>{props.name}</span>
      ) : (
        <span>
          {props.status === "invalid" ? <ErrorOutlineIcon /> : <TaskAltIcon />}
        </span>
      )}
      <span>{props.message}</span>
    </div>
  </div>
);

const Notification = (props) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <ModalOverlay
          status={props.status}
          name={props.name}
          message={props.message}
        />,
        document.getElementById("overlay-root")
      )}
    </Fragment>
  );
};

export default Notification;
