import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import { Typography, useMediaQuery } from "@mui/material";
import ExitToAppRoundedIcon from "@mui/icons-material/ExitToAppRounded";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import classes from "./RoomBar.module.css";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { userActions } from "../../store/user-slice";
import { useNavigate } from "react-router-dom";

const RoomBar = (props) => {
  const matches = useMediaQuery("(max-width:768px)");
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users);
  const userDetails = useSelector((state) => state.user.userDetails);
  const privateUsers = useSelector((state) => state.user.privateUsers);
  const userId = useSelector((state) => state.user.userId);
  const navigate = useNavigate();
  const addUserToPrivateRoomHandler = (user) => {
    let roomName;
    if (user.privateRoom[userId]) {
      roomName = user.privateRoom[userId];
    } else {
      roomName = Math.round(Math.random() * 10000000);
    }
    dispatch(
      userActions.setPrivateUsers([
        ...privateUsers,
        {
          ...user,
          privateRoom: { ...user.privateRoom, [userId]: roomName },
        },
      ])
    );
    const private_users = [
      ...privateUsers,
      { ...user, privateRoom: { ...user.privateRoom, [userId]: roomName } },
    ];
    dispatch(
      userActions.setUsersInRoom({
        room: users.room,
        usersInRoom: [
          ...private_users,
          {
            name: `${users.room} Group`,
            id: "GROUPID",
            checkedInAt: new Date().getTime(),
            groupUsers:
              privateUsers.length == 0
                ? {
                    room: users.room,
                    usersInRoom: users.usersInRoom.map((userData) => {
                      if (userData.id === userId) {
                        return {
                          ...userData,
                          privateRoom: {
                            ...userData.privateRoom,
                            [user.id]: roomName,
                          },
                        };
                      }
                      return userData;
                    }),
                  }
                : {
                    room: users.room,
                    usersInRoom: users.usersInRoom[
                      users.usersInRoom.length - 1
                    ].groupUsers.usersInRoom.map((userData) => {
                      if (userData.id === userId) {
                        return {
                          ...userData,
                          privateRoom: {
                            ...userData.privateRoom,
                            [user.id]: roomName,
                          },
                        };
                      }
                      return userData;
                    }),
                  },
          },
        ],
      })
    );
    dispatch(
      userActions.setUserDetails({
        ...userDetails,
        privateRoom: { ...userDetails.privateRoom, [`${user.id}`]: roomName },
      })
    );
    props.onJoinToPrivateRoom(user, roomName);
  };

  // const removeUserFromPrivateRoomHandler = (user) => {
  //   const updatedPrivateUsers = privateUsers.filter(
  //     (privateUser) => privateUser.id !== user.id
  //   );
  //   dispatch(userActions.setPrivateUsers(updatedPrivateUsers));
  //   if (updatedPrivateUsers.length == 0) {
  //     dispatch(
  //       userActions.setUsersInRoom(
  //         users.usersInRoom[users.usersInRoom.length - 1].groupUsers
  //       )
  //     );
  //     props.onChangeToPublic();
  //   } else {
  //     dispatch(
  //       userActions.setUsersInRoom({
  //         room: users.room,
  //         usersInRoom: [
  //           ...updatedPrivateUsers,
  //           {
  //             name: `${users.room}Group`,
  //             id: "GROUPID",
  //             checkedInAt: new Date().getTime(),
  //             groupUsers:
  //               users.usersInRoom[users.usersInRoom.length - 1].groupUsers,
  //           },
  //         ],
  //       })
  //     );
  //   }
  //   // delete privateMessages of perticular Room.
  //   dispatch(messageActions.updatePrivateMessages(user.privateRoom));
  //   props.onChangeRoom({ id: "GROUPID" });
  // };
  const changeRoomHandler = (data) => {
    if (data.id === "GROUPID") {
      return props.onChangeRoom(data);
    }
    const isPrivate = checkPrivateUserHandler(data.id);
    if (isPrivate) {
      return props.onChangeRoom(data);
    }
  };
  const checkPrivateUserHandler = (id) => {
    const data = privateUsers.findIndex((user) => user.id === id);
    if (data == -1) return false;
    return true;
  };
  return (
    <div
      className={`${classes["roombar-div"]} ${
        matches &&
        (props.isOpen
          ? classes["open_roombar-slider"]
          : classes["close_roombar-slider"])
      }`}
    >
      {props.isOpen &&
        ReactDOM.createPortal(
          <div className={classes["backdrop-div"]} onClick={props.onClick} />,
          document.getElementById("backdrop-root")
        )}
      <div className={classes["header-div"]}>
        <Typography
          color="whitesmoke"
          variant={!matches ? "h4" : "h6"}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            textTransform: "uppercase",
            letterSpacing: !matches ? "1px" : "0.5px",
            fontWeight: "bold",
          }}
        >
          <GroupsOutlinedIcon
            sx={{
              fontSize: !matches ? "2.5rem" : "1.5rem",
            }}
          />
          {users.room}
        </Typography>

        <ExitToAppRoundedIcon
          color="white"
          onClick={() => navigate("/dashbord", { replace: true })}
          sx={{
            fontSize: !matches ? "1.8rem" : "1.3rem",
            color: "gray",
            cursor: "pointer",
            padding: "0.5rem",
            borderRadius: "4px",
            transition: "all 100ms",
            "&:hover": {
              backgroundColor: "#33393d",
              color: "whitesmoke",
            },
          }}
        />
      </div>
      <div className={classes["user-div"]}>
        {users.usersInRoom &&
          users.usersInRoom.map((user) => (
            <Fragment key={user.id}>
              <div
                key={user.id}
                className={
                  user.id === "GROUPID"
                    ? !props.activeUserId
                      ? `${classes["details-div"]} ${classes["group-div"]} ${classes["active-room"]}`
                      : `${classes["details-div"]} ${classes["group-div"]}`
                    : props.activeUserId === user.id
                    ? `${classes["details-div"]} ${classes["active-room"]}`
                    : `${classes["details-div"]}`
                }
                onClick={changeRoomHandler.bind(null, user)}
              >
                {user.id === userId ? "You" : user.name}
                <span className={classes["time-span"]}>
                  At: {moment(user.checkedInAt).format("HH:mm")}
                </span>
                {!user.groupUsers &&
                  user.id !== userId &&
                  !checkPrivateUserHandler(user.id) && (
                    <PersonAddIcon
                      className={classes["svg-1"]}
                      sx={{
                        fontSize: !matches ? "1.3rem" : "0.9rem",
                        cursor: "pointer",
                        display: "none",
                        color: "gray",
                        "&:hover": {
                          color: "whitesmoke",
                        },
                        "&:active": {
                          scale: "95%",
                        },
                      }}
                      onClick={(event) => {
                        event.stopPropagation();
                        addUserToPrivateRoomHandler(user);
                      }}
                      // onClick={addUserToPrivateRoomHandler.bind(null, user)}
                    />
                  )}
              </div>
              {user.groupUsers && (
                <div className={classes["togal-div"]}>
                  {user.groupUsers.usersInRoom.map((user) => (
                    <div key={user.id} className={classes["group-details-div"]}>
                      {user.id === userId ? "You" : user.name}
                      <span className={classes["group-time-span"]}>
                        At: {moment(user.checkedInAt).format("HH:mm")}
                      </span>
                      {user.id !== userId &&
                        !checkPrivateUserHandler(user.id) && (
                          <PersonAddIcon
                            className={classes["svg-2"]}
                            sx={{
                              fontSize: !matches ? "1.3rem" : "0.9rem",
                              cursor: "pointer",
                              display: "none",
                              color: "gray",
                              "&:hover": {
                                color: "whitesmoke",
                              },
                              "&:active": {
                                scale: "95%",
                              },
                            }}
                            onClick={addUserToPrivateRoomHandler.bind(
                              null,
                              user
                            )}
                          />
                        )}
                    </div>
                  ))}
                </div>
              )}
            </Fragment>
          ))}
      </div>
    </div>
  );
};

export default RoomBar;
