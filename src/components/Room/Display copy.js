import React, { Fragment, useState } from "react";
import moment from "moment";
import {
  Box,
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
  const [imagesToShow, setImagesToShow] = useState(null);
  const openModalHandler = () => setIsOpen(true);
  const closeModalHandler = () => setIsOpen(false);
  const changeImagesToShowHandler = (data) => setImagesToShow(data);

  return (
    <ScrollToBottom className={classes["scroller"]}>
      <SimpleModal
        onOpen={imagesToShow !== null}
        onClose={changeImagesToShowHandler}
      >
        <object type="application/pdf" data={url + "#toolbar=0"}>
          <p className="centered">
            Unable to load File.Make sure network conectivity is good.
          </p>
        </object>
      </SimpleModal>
      <div className={classes["display-div"]}>
        <Typography
          sx={{
            fontSize: !matches ? "1.1rem" : "0.8rem",
            backgroundColor: "rgba(70,70,70,0.45)",
            margin: !matches
              ? "1rem 3rem 1.5rem 3rem"
              : "0.5rem 1rem 0.8rem 1rem",
            padding: !matches ? "0.5rem 1rem" : "0.7rem",
            borderRadius: "10px",
            width: "fit-content",
            alignSelf: "center",
            color: "rgb(200,200,200)",
            textAlign: "center",
          }}
        >
          Welcome to our chat room! Connect, converse, and collaborate
          professionally with our vibrant community.
        </Typography>
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
                        fontSize: !matches ? "1.1rem" : "0.8rem",
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
                      spacing={1}
                      // maxHeight={
                      //   !personalUI
                      //     ? !matches
                      //       ? "33rem"
                      //       : "28rem"
                      //     : !matches
                      //     ? "32rem"
                      //     : "27rem"
                      // }
                      // maxWidth={!matches ? "24.5rem" : "15.5rem"}
                      maxHeight={!personalUI ? "32.6" : "31.6rem"}
                      maxWidth="31.6rem"
                      sx={{
                        width: "fit-content",
                        padding: !personalUI
                          ? !matches
                            ? "1.5rem 0.2rem 0.15rem 0.3rem"
                            : "1rem 0.1rem 0rem 0.2rem"
                          : !matches
                          ? "0.2rem 0.2rem 0.15rem 0.3rem"
                          : "0.1rem 0.1rem 0rem 0.2rem",
                        // overflow: data.files.length > 2 ? "scroll" : "",
                        overflow: "hidden",
                        userSelect: "none",
                      }}
                    >
                      {data.files
                        .slice(0, data.files.length < 4 ? data.files.length : 4)
                        .map((file, index) => {
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
                                  <Box
                                    sx={{
                                      background: "pink",
                                      height: "15rem",
                                      width: "15rem",
                                      borderRadius: "10px",
                                      position: "relative",
                                    }}
                                  >
                                    <img
                                      src={url}
                                      className={classes["img-msg"]}
                                      id="i1"
                                      alt=""
                                    />
                                    {data.files.length > 4 && index == 3 && (
                                      <Typography
                                        align="center"
                                        sx={{
                                          position: "absolute",
                                          top: "4rem",
                                          right: 0,
                                          left: 0,
                                          color: "whitesmoke",
                                          fontSize: "4rem",
                                          fontWeight: "10",
                                          textShadow: "2px 2px 10px black",
                                        }}
                                        onClick={openImagesHandler}
                                      >
                                        +{data.files.length - 4}
                                      </Typography>
                                    )}
                                  </Box>
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
                                          padding: !matches
                                            ? "auto"
                                            : "2px 0px",
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
                                          fontSize: !matches
                                            ? "1.5rem"
                                            : "1rem",
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
                                          padding: !matches
                                            ? "0.5rem"
                                            : "0.2rem",
                                          width: "100%",
                                          fontSize: !matches
                                            ? "auto"
                                            : "0.7rem",
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
