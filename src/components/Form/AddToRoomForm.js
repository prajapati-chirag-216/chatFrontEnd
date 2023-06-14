import React, {
  useState,
  useRef,
  useReducer,
  useEffect,
  Suspense,
} from "react";
import {
  Button,
  TextField,
  Autocomplete,
  Typography,
  useMediaQuery,
} from "@mui/material";
import classes from "./AddToRoomForm.module.css";
import { Container } from "@mui/system";
import {
  Await,
  Form,
  redirect,
  useActionData,
  useLoaderData,
} from "react-router-dom";
import store from "../../store/index";
import { userActions } from "../../store/user-slice";
import { nameReducer, roomReducer } from "../../reducers/inputReducer";
import { createInterest, fetchInterests } from "../../lib/api";
import Notification from "../Ui/Notification";

const AddToRoomForm = () => {
  const [page, setPage] = useState("join");
  const nameInputRef = useRef();
  const roomInputRef = useRef();
  const [formIsValid, setFormIsValid] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const matches = useMediaQuery("(max-width:768px)");

  const loaderData = useLoaderData();
  const actionData = useActionData();

  const [nameState, dispatchName] = useReducer(nameReducer, {
    value: "",
    isValid: null,
  });
  const [roomState, dispatchRoom] = useReducer(roomReducer, {
    value: "",
    isValid: null,
  });
  const { isValid: nameIsValid } = nameState;
  const { isValid: roomIsValid } = roomState;
  useEffect(() => {
    const identifier = setTimeout(() => {
      setFormIsValid(nameIsValid && roomIsValid);
    }, 500);

    return () => clearTimeout(identifier);
  }, [nameIsValid, roomIsValid]);
  const nameChangeHandler = (event) => {
    dispatchName({ type: "USER_INPUT", val: event.target.value });
  };
  const roomChangeHandler = (event, value) => {
    dispatchRoom({
      type: "USER_INPUT",
      val: event ? event.target.value : value,
    });
  };
  const validateNameHandler = () => {
    dispatchName({ type: "INPUT_BLUR" });
  };
  const validateRoomHandler = () => {
    dispatchRoom({ type: "INPUT_BLUR" });
  };

  const validateFormHandler = (event) => {
    event.preventDefault();
    if (!nameIsValid) {
      document.getElementById("name").focus();
    } else {
      document.getElementById("room").focus();
    }
  };
  const changePageHandler = () => {
    page === "join" ? setPage("create") : setPage("join");
  };
  useEffect(() => {
    if (actionData?.response?.status === 403) {
      document.getElementById("room").focus();
      setShowNotification(true);
      const timer = setTimeout(() => {
        setShowNotification(false);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [actionData]);
  return (
    <Container maxWidth={!matches ? "sm" : "xs"}>
      {showNotification && (
        <Notification
          status="invalid"
          message={actionData.response?.data?.message}
        />
      )}
      <Form className={classes["action-div"]} method="POST" action="/dashbord">
        <div className={classes["input-div"]}>
          <TextField
            ref={nameInputRef}
            id="name"
            variant="outlined"
            label="name"
            error={nameIsValid === false}
            name="userName"
            onChange={nameChangeHandler}
            onBlur={validateNameHandler}
            value={nameState.value}
            autoComplete="off"
            size={!matches ? "medium" : "small"}
            sx={{
              flex: 3,
              "& input": {
                fontSize: !matches ? "16px" : "12px", // Adjust the font size to make it smaller
                padding: !matches ? "16px" : "9px", // Adjust the padding to reduce the overall size
              },
            }}
            InputLabelProps={{
              sx: { fontSize: !matches ? "16px" : "11px" }, // Adjust the font size of the label
            }}
          />
          <Suspense
            fallback={
              <Typography variant={matches ? "h6" : "h4"}>
                Fetching Interests..
              </Typography>
            }
          >
            <Await resolve={loaderData}>
              {(interest) =>
                page === "join" ? (
                  <Autocomplete
                    disablePortal
                    id="room"
                    options={interest}
                    sx={{
                      flex: !matches ? "2" : "3",
                      "& .MuiInputBase-root": {
                        fontSize: !matches ? "16px" : "12px", // Adjust the font size to change the size of the selector
                        padding: !matches ? "8px" : "4px", // Adjust the padding to resize the selector
                      },
                      "& .MuiAutocomplete-listbox": {
                        fontSize: "10px", // Adjust the font size of the options
                        padding: "1px", // Adjust the padding to resize the options
                      },
                      "& .MuiAutocomplete-clearIndicator": {
                        scale: "80%",
                      },
                      "& .MuiAutocomplete-popupIndicator": {
                        scale: "80%",
                        padding: "0px",
                      },
                    }}
                    ListboxProps={{
                      sx: {
                        fontSize: !matches ? "16px" : "11px",
                        letterSpacing: !matches ? "1px" : "0.5px",
                        padding: "0px",
                      },
                    }}
                    size={!matches ? "medium" : "small"}
                    onChange={(data) =>
                      roomChangeHandler(
                        null,
                        data?.target?.childNodes[0]?.data || ""
                      )
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        ref={roomInputRef}
                        name="interest"
                        label="Room"
                        error={roomIsValid === false}
                        onChange={roomChangeHandler}
                        onBlur={validateRoomHandler}
                        value={roomState.value}
                        sx={{ fontSize: "10px" }}
                        InputLabelProps={{
                          sx: { fontSize: !matches ? "16px" : "11px" }, // Adjust the font size of the label
                        }}
                      />
                    )}
                  />
                ) : (
                  <TextField
                    ref={roomInputRef}
                    name="roomName"
                    id="room"
                    variant="outlined"
                    label="Room"
                    error={roomIsValid === false}
                    onChange={roomChangeHandler}
                    onBlur={validateRoomHandler}
                    value={roomState.value}
                    autoComplete="off"
                    size={!matches ? "medium" : "small"}
                    sx={{
                      flex: 3,
                      "& input": {
                        fontSize: !matches ? "16px" : "10px", // Adjust the font size to make it smaller
                        padding: !matches ? "16px" : "10px", // Adjust the padding to reduce the overall size
                      },
                    }}
                    InputLabelProps={{
                      sx: { fontSize: !matches ? "16px" : "10px" }, // Adjust the font size of the label
                    }}
                  />
                )
              }
            </Await>
          </Suspense>
        </div>
        <Button
          variant="contained"
          type="submit"
          sx={{
            backgroundColor: "black",
            padding: !matches ? "0.8rem" : "0.5rem",
            transition: "all 300ms",
            "&:hover": {
              backgroundColor: "black",
            },
            fontSize: !matches ? "1.2rem" : "0.7rem",
          }}
          onClick={!formIsValid ? validateFormHandler : () => {}}
        >
          {page === "join" ? "Join" : "Create"}
        </Button>
        <span onClick={changePageHandler} className={classes.link}>
          {page === "join" ? "Create" : "Join"} Room
        </span>
      </Form>
    </Container>
  );
};

export async function loader() {
  let res;
  try {
    res = await fetchInterests();
  } catch (err) {
    throw err;
  }
  return res;
}

export async function action({ request }) {
  const formData = await request.formData();
  const fieldName = formData.get("roomName") ? "roomName" : "interest";
  const userData = {
    name: formData.get("userName"),
    [fieldName]: formData.get(fieldName),
  };
  try {
    await createInterest({ [fieldName]: formData.get(fieldName) });
  } catch (err) {
    if (err.response && err.response.status === 403) {
      return err;
    }
    throw err;
  }
  store.dispatch(userActions.setUserDetails(userData));
  return redirect("/chat");
}
export default AddToRoomForm;
