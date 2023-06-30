import React, { Fragment, useEffect, useState } from "react";
import moment from "moment";
import {
  Box,
  Button,
  Container,
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
import { useSelector } from "react-redux";
import LoadingSpinner from "../Ui/LoadingSpinner";

const buttonStyle = {
  transition: "all 200ms",
  backgroundColor: "rgba(125, 118, 118, 0.3)",
  width: "100%",
  height: "100%",
  borderRadius: "50%",
};

const Display = (props) => {
  const matches = useMediaQuery("(max-width:768px)");
  // const file
  const messagesLength = props.messages.length;
  const [pdfToShow, setPdfToShow] = useState(null);
  const [imagesToShow, setImagesToShow] = useState([]);
  const filesToLoad = useSelector((state) => state.ui.filesToLoad);
  const openModalHandler = (file) => {
    setPdfToShow(file);
  };
  const closeModalHandler = () => {
    setPdfToShow(null);
  };
  const changeImagesToShowHandler = (data) => {
    setImagesToShow(data || []);
  };

  return (
    <ScrollToBottom className={classes["scroller"]}>
      <SimpleModal
        onOpen={imagesToShow.length > 0}
        onClose={changeImagesToShowHandler.bind(null, [])}
      >
        <Box
          sx={{
            Display: "flex",
            flexDirection: "column",
            gap: "1rem",
            // maxHeight: "95%",
          }}
        >
          <Typography
            align="center"
            sx={{
              fontSize: !matches ? "1.5rem" : "1rem",
              textTransform: "uppercase",
              letterSpacing: !matches ? "1px" : "0.5px",
              color: "rgb(100,100,100)",
              marginBottom: "0.5rem",
            }}
          >
            Gallary
          </Typography>
          <Box
            sx={{
              Display: "flex",
              flexDirection: "column",
              overflowY: "scroll",
              maxHeight: "40rem",
              textAlign: "center",
              backgroundColor: "rgb(200,200,200)",
            }}
          >
            {imagesToShow?.map((file, index) => {
              const url = `data:${file.type};base64,${file.file}`;
              return (
                <div className={classes["modal-img-container"]} key={index}>
                  <img
                    key={file.createdAt}
                    src={url}
                    className={classes["modal-img"]}
                    id="i1"
                    alt=""
                  />
                  <a
                    href={url}
                    download={file.name}
                    className={classes["img-download-btn"]}
                  >
                    <Button
                      className="btn"
                      variant="contained"
                      sx={
                        !matches
                          ? {
                              ...buttonStyle,
                              "&:hover": {
                                backgroundColor: "#4e5451",
                              },
                              "&:hover > svg": {
                                color: "white",
                              },
                              "&:active": {
                                backgroundColor: "#4e5451",
                                transform: "scale(0.95)",
                              },
                            }
                          : {
                              ...buttonStyle,
                              "&:hover": {
                                backgroundColor: "rgba(125, 118, 118, 0.3)",
                              },
                              "&:active": {
                                transform: "scale(0.9)",
                              },
                            }
                      }
                    >
                      <DownloadOutlinedIcon
                        id="download-icon"
                        fontSize="large"
                        sx={{
                          fontSize: !matches ? "auto" : "1.5rem",
                          color: "gray",
                        }}
                      />
                    </Button>
                  </a>
                </div>
              );
            })}
          </Box>
        </Box>
      </SimpleModal>
      <SimpleModal onOpen={pdfToShow != null} onClose={closeModalHandler}>
        {pdfToShow && (
          <div className={classes["pdf-container"]}>
            <Typography
              align="center"
              sx={{
                fontSize: !matches ? "1.5rem" : "1rem",
                textTransform: "uppercase",
                letterSpacing: !matches ? "1px" : "0.5px",
              }}
            >
              {pdfToShow.name}
            </Typography>
            <Divider
              sx={{
                backgroundColor: "rgb(250,250,250)",
              }}
            />
            <object type="application/pdf" data={pdfToShow.url + "#toolbar=0"}>
              <Typography
                align="center"
                sx={{
                  fontSize: !matches ? "1.1rem" : "0.8rem",
                  color: "rgb(100,100,100)",
                  letterSpacing: "0.5px",
                }}
              >
                Unable to load File.Make sure network conectivity is good.
                <br />
                or you can download instead
              </Typography>
            </object>
          </div>
        )}
      </SimpleModal>
      <div className={classes["display-div"]}>
        <Typography
          sx={{
            fontSize: !matches ? "1.1rem" : "0.8rem",
            backgroundColor: "rgba(70,70,70,0.45)",
            margin: !matches
              ? "1rem 3rem 0.5rem 3rem"
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
          `;
          return (
            <div key={data.createdAt} className={classes["message-div"]}>
              <div className={classNames} key={data.createdAt}>
                <div>
                  {!personalUI && <span>{data.name}</span>}
                  {data.url && (
                    <Box
                      sx={{
                        width: !matches ? "22rem" : "12rem",
                        margin: !personalUI
                          ? !matches
                            ? "1.5rem 0.3rem 0rem 0.3rem"
                            : "1rem 0.15rem 0rem 0.15rem"
                          : !matches
                          ? "0.2rem 0.2rem 0rem 0.2rem"
                          : "0.1rem 0.1rem 0rem 0.1rem",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <a href={data.url} target="_blank">
                        <img
                          src="map.jpeg"
                          className={classes["img-msg"]}
                          id="i1"
                          alt=""
                        />
                      </a>
                      <Typography
                        align="center"
                        letterSpacing={!matches ? "1px" : "0.2px"}
                        style={{
                          fontSize: !matches ? "1rem" : "0.7rem",
                          fontFamily:
                            "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                        }}
                      >
                        {personalUI ? "Your" : "My"} current location
                      </Typography>
                    </Box>
                  )}
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
                      maxHeight={
                        !personalUI
                          ? !matches
                            ? "32.6"
                            : "20rem"
                          : !matches
                          ? "31.6rem"
                          : "27rem"
                      }
                      // width={!matches ? "max-content" : "17.4rem"}
                      maxWidth={!matches ? "31.6rem" : "17.4rem"}
                      sx={{
                        width:
                          data.files[0].type === "application/pdf"
                            ? !matches
                              ? "31.6rem"
                              : "17.4rem"
                            : "auto",
                        padding: !personalUI
                          ? !matches
                            ? "1.5rem 0.2rem 0.15rem 0.3rem"
                            : "1rem 0.1rem 0rem 0.2rem"
                          : !matches
                          ? "0.2rem 0.2rem 0.15rem 0.3rem"
                          : "0.1rem 0.1rem 0rem 0.2rem",
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
                                file.type === "application/pdf"
                                  ? 12
                                  : 6
                              }
                              key={index}
                              sx={{
                                width:
                                  file.type === "application/pdf"
                                    ? "100%"
                                    : "auto",
                                position: "relative",
                                transition: "all 200ms",
                              }}
                            >
                              {file.type.startsWith("image") && (
                                <Fragment>
                                  <div
                                    className={classes["img-container"]}
                                    onClick={changeImagesToShowHandler.bind(
                                      null,
                                      data.files
                                    )}
                                  >
                                    {data.files.length > 4 && index == 3 && (
                                      <div className={classes["img-overlay"]} />
                                    )}
                                    <img
                                      src={url}
                                      className={classes["img-msg"]}
                                      id="i1"
                                      alt=""
                                    />
                                    {data.files.length > 4 && index == 3 && (
                                      <Fragment>
                                        <Typography
                                          align="center"
                                          sx={{
                                            position: "absolute",
                                            top: "50%",
                                            left: "50%",
                                            transform: "translate(-50%, -50%)",
                                            color: "whitesmoke",
                                            fontSize: !matches
                                              ? "4rem"
                                              : "2.5rem",
                                            fontWeight: !matches ? "10" : "360",
                                          }}
                                        >
                                          +{data.files.length - 4}
                                        </Typography>
                                      </Fragment>
                                    )}
                                  </div>
                                </Fragment>
                              )}
                              {file.type == "application/pdf" && (
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
                                      {file.name.length > 20
                                        ? `${file.name.slice(
                                            0,
                                            12
                                          )}..${file.name.slice(
                                            file.name.length - 8
                                          )}.pdf`
                                        : file.name}
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
                                      onClick={openModalHandler.bind(null, {
                                        name: file.name,
                                        url,
                                      })}
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
        {Object.keys(filesToLoad).map((files, index) => {
          return (
            <div
              className={`${classes["text-div"]} ${classes["personal-box"]} ${
                props.messages[messagesLength - 1]?.id !== props.id
                  ? classes["new_personal-box"]
                  : ""
              }`}
              style={{ marginLeft: "auto" }}
              key={files}
            >
              {console.log(props.messages[messagesLength - 1]?.id, props.id)}
              <Grid
                container
                spacing={1}
                maxHeight={!matches ? "31.6rem" : "27rem"}
                maxWidth={!matches ? "31.6rem" : "17.4rem"}
                sx={{
                  width: filesToLoad[files][0].name.endsWith(".pdf")
                    ? !matches
                      ? "31.6rem"
                      : "17.4rem"
                    : "auto",
                  padding: !matches
                    ? "0.2rem 0.2rem 0.15rem 0.3rem"
                    : "0.1rem 0.1rem 0rem 0.2rem",
                  overflow: "hidden",
                  userSelect: "none",
                }}
              >
                {filesToLoad[files].map((file) => {
                  return (
                    <Grid
                      item
                      md={
                        filesToLoad[files].length === 1 ||
                        file.name.endsWith(".pdf")
                          ? 12
                          : 6
                      }
                      key={file.fileId}
                      sx={{
                        width: file.name.endsWith(".pdf") ? "100%" : "auto",
                        position: "relative",
                        transition: "all 200ms",
                        "&:hover a": {
                          display: "block",
                        },
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <div
                        className={`${classes["file-loader-msg"]} ${
                          file.name.endsWith(".pdf")
                            ? classes["pdf-msg-container"]
                            : classes["img-container"]
                        }`}
                        style={{
                          width: file.name.endsWith(".pdf")
                            ? "100%"
                            : !matches
                            ? "15rem"
                            : "8rem",
                          backgroundColor: !file.name.endsWith(".pdf")
                            ? "rgba(111, 111, 111, 0.6)"
                            : "auto",
                          padding: file.name.endsWith(".pdf")
                            ? !matches
                              ? "0.17rem 0.5rem"
                              : "0.35rem 0.5rem"
                            : "auto",
                        }}
                      >
                        <div className={classes["file-loader-container"]}>
                          <LoadingSpinner
                            className={
                              file.name.endsWith(".pdf") ? "pdf-spinner" : ""
                            }
                          />
                          <Typography
                            align="center"
                            sx={{
                              fontSize: !matches ? "1.1rem" : "0.7rem",
                              textTransform: "uppercase",
                              color: "rgb(180,180,180)",
                              paddingBottom: "0.3rem",
                            }}
                          >
                            {console.log(file.name)}
                            {!file.name.endsWith(".pdf")
                              ? file.name.length > 15
                                ? `${file.name.slice(0, 7)}...${file.name.slice(
                                    file.name.length - 5
                                  )}`
                                : file.name
                              : file.name.length > 20
                              ? `${file.name.slice(0, 12)}...${file.name.slice(
                                  file.name.length - 8
                                )}`
                              : file.name}
                          </Typography>
                        </div>
                      </div>
                    </Grid>
                  );
                })}
              </Grid>
            </div>
          );
        })}
        <div className={classes["last-message"]} />
      </div>
    </ScrollToBottom>
  );
};

export default Display;
