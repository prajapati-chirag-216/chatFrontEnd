import React, { Fragment, useState } from "react";
import moment from "moment";
import {
  Button,
  Divider,
  Grid,
  Typography,
  useMediaQuery,
} from "@mui/material";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import ScrollToBottom from "react-scroll-to-bottom";
import classes from "./Display.module.css";
import SimpleModal from "../Ui/SimpleModal";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";

const Display = (props) => {
  const matches = useMediaQuery("(max-width:768px)");

  const messagesLength = props.messages.length;
  const [isOpen, setIsOpen] = useState(false);
  const openModalHandler = () => setIsOpen(true);
  const closeModalHandler = () => setIsOpen(false);
  return (
    <ScrollToBottom className={classes["scroller"]}>
      <div className={classes["display-div"]}>
        {props.messages.map((data, index) => {
          const personalUI = data.id === props.id;
          const prevId = props.messages[index - 1 <= 0 ? 0 : index - 1].id;

          const classNames = `${classes["text-div"]} ${
            personalUI ? classes["personal-box"] : classes["others-box"]
          }
            ${
              (index == 0 || data.id !== prevId) &&
              (personalUI
                ? classes["new_personal-box"]
                : classes["new_others-box"])
            }
            ${index === messagesLength - 1 && classes["last-message"]}
          `;
          return (
            <div key={data.createdAt} className={classes["message-div"]}>
              <div className={classNames} key={data.createdAt}>
                <div>
                  {!personalUI && <span>{data.name}</span>}
                  {data.message && (
                    <Typography
                      letterSpacing={!matches ? "1px" : "0.5px"}
                      style={{
                        fontSize: !matches ? "1.1rem" : "0.75rem",
                        padding: !personalUI
                          ? !matches
                            ? "1.2rem 5rem 0.4rem 0.4rem"
                            : "1rem 4.5rem 0.2rem 0.3rem"
                          : !matches
                          ? "0.4rem 5rem 0.4rem 0.4rem"
                          : "0.2rem 4.5rem 0.3rem 0.3rem",
                        fontFamily:
                          "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                      }}
                    >
                      {data.message}
                    </Typography>
                  )}
                  {data.files && (
                    <Grid
                      container
                      spacing={!matches ? 1.5 : 1}
                      maxHeight={
                        !personalUI
                          ? !matches
                            ? "33rem"
                            : "28rem"
                          : !matches
                          ? "32rem"
                          : "27rem"
                      }
                      maxWidth={!matches ? "24.5rem" : "15.5rem"}
                      sx={{
                        width: "fit-content",
                        padding: !personalUI
                          ? !matches
                            ? "1.5rem 0.2rem 0rem 0.3rem"
                            : "1rem 0.1rem 0rem 0.2rem"
                          : !matches
                          ? "0.2rem 0.2rem 0rem 0.3rem"
                          : "0.1rem 0.1rem 0rem 0.2rem",
                        overflow: data.files.length > 2 ? "scroll" : "",
                        userSelect: "none",
                      }}
                    >
                      {data.files.map((file, index) => {
                        const url = `data:${file.type};base64,${file.file}`;
                        return (
                          <Grid
                            item
                            md={
                              data.files.length === 1 ||
                              file.type == "application/pdf"
                                ? 12
                                : 6
                            }
                            key={index}
                            sx={{
                              position: "relative",
                              transition: "all 200ms",
                              "&:hover a": {
                                display: "block",
                              },
                            }}
                          >
                            {file.type.startsWith("image") && (
                              <Fragment>
                                <img
                                  src={url}
                                  className={classes["img-msg"]}
                                  id="i1"
                                  alt=""
                                />
                                {!personalUI && (
                                  <a
                                    href={url}
                                    download={file.name}
                                    className={classes["download-btn"]}
                                  >
                                    <Button
                                      variant="contained"
                                      sx={{
                                        transition: "all 200ms",
                                        backgroundColor:
                                          "rgba(125, 118, 118, 0.95)",
                                        "&:hover": {
                                          backgroundColor: "#4e5451",
                                        },
                                        "&:active": {
                                          transform: "scale(0.9)",
                                        },
                                        padding: !matches ? "auto" : "2px 0px",
                                        minWidth: !matches ? "65px" : "40px",
                                      }}
                                    >
                                      <DownloadOutlinedIcon
                                        fontSize="small"
                                        sx={{
                                          fontSize: !matches
                                            ? "auto"
                                            : "0.9rem",
                                        }}
                                      />
                                    </Button>
                                  </a>
                                )}
                              </Fragment>
                            )}
                            {file.type == "application/pdf" && (
                              <Fragment>
                                <SimpleModal
                                  onOpen={isOpen}
                                  onClose={closeModalHandler}
                                >
                                  <div className={classes["pdf-container"]}>
                                    <Typography
                                      align="center"
                                      sx={{
                                        fontSize: !matches ? "1.5rem" : "1rem",
                                        textTransform: "uppercase",
                                        letterSpacing: !matches
                                          ? "1px"
                                          : "0.5px",
                                      }}
                                    >
                                      {file.name}
                                    </Typography>
                                    <Divider
                                      sx={{
                                        backgroundColor: "rgb(250,250,250)",
                                      }}
                                    />
                                    <object
                                      type="application/pdf"
                                      data={url + "#toolbar=0"}
                                    >
                                      <p className="centered">
                                        Unable to load File.Make sure network
                                        conectivity is good.
                                      </p>
                                    </object>
                                  </div>
                                </SimpleModal>

                                <div className={classes["pdf-msg-container"]}>
                                  <div
                                    className={classes["pdf-name-container"]}
                                  >
                                    <PictureAsPdfIcon
                                      sx={{
                                        fontSize: !matches
                                          ? "1.5rem"
                                          : "0.9rem",
                                      }}
                                    />
                                    <Typography
                                      align="center"
                                      sx={{
                                        fontSize: !matches
                                          ? "1.2rem"
                                          : "0.8rem",
                                        textTransform: "uppercase",
                                      }}
                                    >
                                      {file.name}
                                    </Typography>
                                  </div>
                                  <Divider />
                                  <div
                                    className={classes["pdf-btns-container"]}
                                  >
                                    <Button
                                      variant="contained"
                                      sx={{
                                        transition: "all 200ms",
                                        backgroundColor:
                                          "rgba(125, 118, 118, 0.4)",
                                        "&:hover": {
                                          backgroundColor:
                                            "rgba(120, 120, 120, 0.7)",
                                        },
                                        "&:active": {
                                          transform: "scale(0.9)",
                                        },
                                        padding: !matches ? "0.5rem" : "0.2rem",
                                        width: "100%",
                                        fontSize: !matches ? "auto" : "0.7rem",
                                      }}
                                      onClick={openModalHandler}
                                    >
                                      Open
                                    </Button>
                                    <a
                                      href={url}
                                      download={file.name}
                                      style={{ flex: "100%" }}
                                    >
                                      <Button
                                        variant="contained"
                                        sx={{
                                          width: "100%",
                                          transition: "all 200ms",
                                          backgroundColor:
                                            "rgba(125, 118, 118, 0.4)",
                                          "&:hover": {
                                            backgroundColor:
                                              "rgba(120, 120, 120, 0.7)",
                                          },
                                          "&:active": {
                                            transform: "scale(0.9)",
                                          },
                                          padding: !matches
                                            ? "0.5rem"
                                            : "0.2rem",
                                          fontSize: !matches
                                            ? "auto"
                                            : "0.7rem",
                                        }}
                                      >
                                        DownLoad
                                      </Button>
                                    </a>
                                  </div>
                                </div>
                              </Fragment>
                            )}
                          </Grid>
                        );
                      })}
                    </Grid>
                  )}
                </div>
                <span className={classes["time-span"]}>
                  {moment(data.createdAt).format("HH:mm")}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </ScrollToBottom>
  );
};

export default Display;
