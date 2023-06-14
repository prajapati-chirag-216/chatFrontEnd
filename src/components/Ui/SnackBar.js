import * as React from "react";
import { Snackbar, Slide, Button, Box, Divider } from "@mui/material";
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
          size="small"
          onClick={roomChangeHandler.bind(
            null,
            snackBarDetails.room,
            snackBarDetails.user
          )}
        >
          Open
        </Button>
      )}
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
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
          autoHideDuration={6000}
          TransitionComponent={TransitionLeft}
          key="transitionLeft"
          sx={{ display: "flex", alignItems: "center" }}
        >
          <Alert
            onClose={handleClose}
            severity={snackBarDetails.severity}
            sx={{
              width: "100%",
              padding: "0.5rem 1.2rem",
              fontSize: "1.1rem",
              letterSpacing: "1px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                fontSize: "1.1rem",
                letterSpacing: "1px",
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
          autoHideDuration={6000}
          TransitionComponent={TransitionLeft}
          key="transitionLeft"
          action={action}
          sx={{ padding: "0rem" }}
          message={
            <Box sx={{ display: "flex", flexDirection: "column", gap: "3px" }}>
              <Typography
                sx={{
                  letterSpacing: "1.5px",
                  textTransform: "capitalize",
                  fontSize: "1.1rem",
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
                  letterSpacing: "1px",
                  color: "rgb(120, 120, 120)",
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
