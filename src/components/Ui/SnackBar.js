import * as React from "react";
import {
  Snackbar,
  Slide,
  Button,
  Box,
  Divider,
  useMediaQuery,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Typography } from "@mui/material";
import { uiActions } from "../../store/ui-slice";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { userActions } from "../../store/user-slice";
import MuiAlert from "@mui/material/Alert";

function TransitionLeft(props) {
  return <Slide {...props} direction="left" />;
}
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const SimpleSnackBar = () => {
  const matches = useMediaQuery("(max-width:768px)");
  const snackBarMatches = useMediaQuery("(max-width:400px)");

  const snackBarDetails = useSelector((state) => state.ui.snackBar);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(
      uiActions.setSnackBar({
        status: false,
        text: "",
        name: "",
        severity: snackBarDetails?.severity || null,
      })
    );
  };
  const roomChangeHandler = (room, user) => {
    dispatch(
      uiActions.setSnackBar({
        status: false,
        text: "",
        name: "",
        severity: snackBarDetails?.severity || null,
      })
    );
    dispatch(uiActions.setCurruntRoom(room));
    dispatch(userActions.setActiveUser(user || null));
  };
  const action = (
    <React.Fragment>
      {snackBarDetails.text && (
        <Button
          color="primary"
          // size="small"
          onClick={roomChangeHandler.bind(
            null,
            snackBarDetails.room,
            snackBarDetails.user
          )}
          sx={{ fontSize: !matches ? "1.1rem" : "0.7rem" }}
        >
          Open
        </Button>
      )}
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
        sx={{ fontSize: !matches ? "1rem" : "0.8rem" }}
      >
        <CloseIcon sx={{ fontSize: !matches ? "1rem" : "0.9rem" }} />
      </IconButton>
    </React.Fragment>
  );
  return (
    <div>
      {snackBarDetails.severity ? (
        <Snackbar
          open={snackBarDetails.status}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          autoHideDuration={60000}
          TransitionComponent={TransitionLeft}
          key="transitionLeft"
          sx={{ display: "flex", alignItems: "center" }}
        >
          <Alert
            onClose={handleClose}
            severity={snackBarDetails.severity}
            sx={{
              width: !snackBarMatches ? "auto" : "100%",
              padding: !matches ? "0.5rem 1.2rem" : " 0.2rem 0.9rem",
              display: "flex",
              alignItems: "center",
              "& .MuiSvgIcon-root": {
                fontSize: !matches ? "1.3rem" : "0.9rem", // Adjust the size of the icon
                alignSlef: "flex-start",
                marginBottom: "3px",
              },
              "& .MuiAlert-icon": {
                fontSize: !matches ? "1.3rem" : "0.9rem", // Adjust the size of the icon
                marginBottom: "-3px",
              },
            }}
          >
            <Typography
              sx={{
                fontSize: !matches ? "1.1rem" : "0.8rem",

                letterSpacing: !matches ? "1px" : "0.5px",

                color: "whitesmoke",
              }}
            >
              {snackBarDetails.text}
            </Typography>
          </Alert>
        </Snackbar>
      ) : (
        <Snackbar
          open={snackBarDetails.status}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          autoHideDuration={60000}
          TransitionComponent={TransitionLeft}
          key="transitionLeft"
          action={action}
          sx={{ padding: "0rem" }}
          message={
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: !matches ? "3px" : "2px",
              }}
            >
              <Typography
                sx={{
                  letterSpacing: !matches ? "1.5px" : "0.5px",
                  textTransform: "capitalize",
                  fontSize: !matches ? "1.1rem" : "0.8rem",
                  color: "rgb(200,200, 200)",
                }}
              >
                {snackBarDetails.name}
              </Typography>
              <Divider
                sx={{ color: "white", backgroundColor: "rgb(80, 80, 80)" }}
              />
              <Typography
                sx={{
                  letterSpacing: !matches ? "1px" : "0.5px",
                  color: "rgb(120, 120, 120)",
                  fontSize: !matches ? "1.1rem" : "0.8rem",
                }}
              >
                {snackBarDetails.text || snackBarDetails.info}
              </Typography>
            </Box>
          }
        />
      )}
    </div>
  );
};
export default SimpleSnackBar;
