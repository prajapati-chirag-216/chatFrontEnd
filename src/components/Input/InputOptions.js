import React, { useRef, useState } from "react";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Stack from "@mui/material/Stack";
import AttachmentOutlinedIcon from "@mui/icons-material/AttachmentOutlined";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import InsertPhotoOutlinedIcon from "@mui/icons-material/InsertPhotoOutlined";
import VideoCameraBackOutlinedIcon from "@mui/icons-material/VideoCameraBackOutlined";
import FmdGoodOutlinedIcon from "@mui/icons-material/FmdGoodOutlined";
import { useMediaQuery } from "@mui/material";
import classes from "./InputOptions.module.css";

const MenuStyle = {
  borderRadius: "4px",
  "&:hover": {
    backgroundColor: "#43494d",
  },
};

const InputOptions = (props) => {
  const matches = useMediaQuery("(max-width:768px)");
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const imageInputRef = useRef();
  const fileInputRef = useRef();
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };
  const handleImageInputClick = () => {
    imageInputRef.current.click();
  };
  const handleFileInputClick = () => {
    fileInputRef.current.click();
  };
  const handleLocationInputClick = () => {
    props.onSendLocation();
    setOpen(false);
  };

  const handleInputChange = (event) => {
    const files = event.target.files;
    props.onSendFiles(files);
    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <Stack direction="row" spacing={2}>
      <div>
        <span
          className={classes["image-span"]}
          ref={anchorRef}
          id="composition-button"
          aria-controls={open ? "composition-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
        >
          <AttachmentOutlinedIcon
            sx={{
              color: "whitesmoke",
              fontSize: !matches ? "1.8rem" : "1rem",
              transform: "rotate(140deg)",
            }}
          />
        </span>
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          placement="bottom-start"
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === "bottom-start" ? "left top" : "left bottom",
              }}
            >
              <Paper
                sx={{
                  backgroundColor: "#32373b",
                  padding: !matches ? "0 0.5rem" : "0 0.2rem",
                  marginBottom: !matches ? "14px" : "10px",
                }}
              >
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    autoFocusItem={open}
                    id="composition-menu"
                    aria-labelledby="composition-button"
                    onKeyDown={handleListKeyDown}
                    sx={{ color: "whitesmoke" }}
                  >
                    <MenuItem
                      onClick={handleFileInputClick}
                      sx={{
                        ...MenuStyle,
                        fontSize: !matches ? "1.1rem" : "0.8rem",
                        minHeight: !matches ? "36px" : "20px",
                      }}
                    >
                      <InsertDriveFileOutlinedIcon
                        sx={{
                          marginRight: "5px",
                          fontSize: !matches ? "1.1rem" : "0.8rem",
                          letterSpacing: !matches ? "1px" : "0.5px",
                        }}
                      />
                      File
                      <input
                        type="file"
                        accept=".pdf"
                        multiple
                        style={{ display: "none" }}
                        ref={fileInputRef}
                        onChange={handleInputChange}
                      />
                    </MenuItem>
                    <MenuItem
                      onClick={handleImageInputClick}
                      sx={{
                        ...MenuStyle,
                        fontSize: !matches ? "1.1rem" : "0.8rem",
                        minHeight: !matches ? "36px" : "20px",
                      }}
                    >
                      <InsertPhotoOutlinedIcon
                        sx={{
                          marginRight: "5px",
                          fontSize: !matches ? "1.1rem" : "0.8rem",
                          letterSpacing: !matches ? "1px" : "0.5px",
                        }}
                      />
                      Photo
                      <input
                        type="file"
                        accept=".png, .jpeg, .jpg"
                        multiple
                        style={{ display: "none" }}
                        ref={imageInputRef}
                        onChange={handleInputChange}
                      />
                    </MenuItem>
                    <MenuItem
                      onClick={handleLocationInputClick}
                      sx={{
                        ...MenuStyle,
                        fontSize: !matches ? "1.1rem" : "0.8rem",
                        minHeight: !matches ? "36px" : "20px",
                      }}
                    >
                      <FmdGoodOutlinedIcon
                        sx={{
                          marginRight: "5px",
                          fontSize: !matches ? "1.1rem" : "0.8rem",
                          letterSpacing: !matches ? "1px" : "0.5px",
                        }}
                      />
                      Location
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    </Stack>
  );
};
export default InputOptions;
