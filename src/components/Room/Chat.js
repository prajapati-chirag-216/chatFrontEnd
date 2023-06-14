import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import soketIo from "socket.io-client";
import Input from "../Input/Input";
import Display from "./Display";
import classes from "./Chat.module.css";
import { userActions } from "../../store/user-slice";
import Header from "./Header";
import { messageActions } from "../../store/message-slice";
import { uiActions } from "../../store/ui-slice";
import { useNavigate } from "react-router-dom";
const ENDPOINT = "http://localhost:8000";

let socket;

const Chat = (props) => {
  const navigate = useNavigate();

  const { privateUser, isPrivate } = props;
  const messages = useSelector((state) => state.message.messages);
  const privateMessages = useSelector((state) => state.message.privateMessages);
  const [userId, setUserId] = useState(null);
  const dispatch = useDispatch();
  const roomUsers = useSelector((state) => state.user.users);
  const userDetails = useSelector((state) => state.user.userDetails);
  const currentRoom = useSelector((state) => state.ui.currentRoom);
  const sendMessageHandler = (message) => {
    socket.emit("send_message", message, (error) => {
      if (error) {
        throw error;
      }
    });
  };
  const sendPrivateMessageHandler = (message) => {
    socket.emit(
      "send_private_message",
      { message, room: currentRoom },
      (error) => {
        if (error) {
          throw error;
        }
      }
    );
  };

  const sendFilesHandler = (files) => {
    const fileDetails = [];
    for (const file in files) {
      if (file === "length") break;
      const data = {
        file: files[file],
        type: files[file].type,
        name: files[file].name,
      };
      fileDetails.push(data);
    }
    socket.emit("send_Files", fileDetails, (error) => {
      if (error) {
        throw error;
      }
    });
  };

  useEffect(() => {
    socket = soketIo(ENDPOINT, { transports: ["websocket"] });

    socket.on("connect", () => {
      setUserId(socket.id);
      dispatch(userActions.setUserId(socket.id));
    });
    if (userDetails) {
      socket.emit("join", userDetails, (error) => {
        if (error) {
          throw error;
        }
      });
    } else {
      console.log("else");
      navigate("/dashbord");
      dispatch(
        uiActions.setSnackBar({
          status: true,
          severity: "warning",
          text: "Add your details",
        })
      );
    }
  }, []);

  useEffect(() => {
    if (currentRoom && privateUser && !privateUser?.privateRoom[userId]) {
      socket.emit(
        "private_room",
        {
          me: { ...userDetails, id: userId },
          user: privateUser,
          roomName: currentRoom,
        },
        (error) => {
          if (error) {
            throw error;
          }
        }
      );
    }
  }, [currentRoom, privateUser]);

  useEffect(() => {
    socket.on("recive_message", (data) => {
      if (currentRoom) {
        dispatch(
          uiActions.setSnackBar({
            status: true,
            text: data.message || `message from ${data.name}`,
            name: `${roomUsers.room} Group`,
            room: null,
          })
        );
      }
      const user = {
        name: data.name,
        message: data.message,
        files: data.files,
        createdAt: data.createdAt,
        id: data.id,
      };
      dispatch(messageActions.setMessages(user));
    });
    socket.on("recive_private_message", (data) => {
      console.log("derials  ", userDetails, data);
      if (data.privateRoom !== currentRoom) {
        const isText =
          userDetails?.privateRoom && userDetails.privateRoom[data.id];
        const snackBarDetails = {
          status: true,
          [isText ? "text" : "info"]: isText
            ? data.message || `message from ${data.name}`
            : `${data.name} wants to send you message`,
          name: data.name,
          room: data.privateRoom,
          user: data.user,
        };
        dispatch(uiActions.setSnackBar(snackBarDetails));
      }
      const user = {
        name: data.name,
        message: data.message,
        files: data.files,
        createdAt: data.createdAt,
        id: data.id,
      };
      dispatch(
        messageActions.setPrivateMessages({
          room: data.privateRoom,
          data: user,
        })
      );
    });
    socket.on("room", (data) => {
      let flag = 1;
      if (roomUsers.length === 0) {
        dispatch(userActions.setUsersInRoom(data));
      } else if (data.updatedUser) {
        dispatch(
          userActions.setUsersInRoom({
            room: roomUsers.room,
            usersInRoom: roomUsers.usersInRoom.map((user) => {
              if (user.id === data.updatedUser.id) {
                flag = 0;
                return data.updatedUser;
              } else if (flag && user.id === "GROUPID") {
                return {
                  ...user,
                  groupUsers: {
                    room: roomUsers.room,
                    usersInRoom: user.groupUsers.usersInRoom.map((grpuser) => {
                      if (grpuser.id === data.updatedUser.id) {
                        return data.updatedUser;
                      } else {
                        return grpuser;
                      }
                    }),
                  },
                };
              }
              return user;
            }),
          })
        );
      } else if (data.removedUser) {
        const filteredPrivateUsers = roomUsers.usersInRoom.filter(
          (user) => user.id !== data.removedUser.id
        );
        const filteredGroupUsers = filteredPrivateUsers[
          filteredPrivateUsers.length - 1
        ].groupUsers.usersInRoom.filter(
          (user) => user.id !== data.removedUser.id
        );
        let filteredRoomUSers;
        if (filteredPrivateUsers.length <= 1) {
          filteredRoomUSers = {
            room: roomUsers.room,
            usersInRoom: filteredGroupUsers,
          };
        } else {
          filteredRoomUSers = {
            room: roomUsers.room,
            usersInRoom: [
              ...filteredPrivateUsers.slice(0, filteredPrivateUsers.length - 1),
              {
                ...roomUsers.usersInRoom[roomUsers.usersInRoom.length - 1],
                groupUsers: {
                  room: roomUsers.room,
                  usersInRoom: filteredGroupUsers,
                },
              },
            ],
          };
        }
        props.onChangeToPublic();
        dispatch(
          userActions.setPrivateUsers(
            filteredPrivateUsers.slice(0, filteredPrivateUsers.length - 1)
          )
        );
        dispatch(userActions.setUsersInRoom(filteredRoomUSers));
      } else if (isPrivate) {
        const group = roomUsers.usersInRoom[roomUsers.usersInRoom.length - 1];
        dispatch(
          userActions.setUsersInRoom({
            room: data.room,
            usersInRoom: [
              ...roomUsers.usersInRoom.slice(
                0,
                roomUsers.usersInRoom.length - 1
              ),
              {
                ...group,
                groupUsers: {
                  ...data.usersInRoom,
                  usersInRoom: [
                    ...group.groupUsers.usersInRoom,
                    data.usersInRoom[data.usersInRoom.length - 1],
                  ],
                },
              },
            ],
          })
        );
      } else {
        dispatch(
          userActions.setUsersInRoom({
            room: data.room,
            usersInRoom: [
              ...roomUsers.usersInRoom,
              data.usersInRoom[data.usersInRoom.length - 1],
            ],
          })
        );
      }
    });
    return () => socket.off();
  }, [messages, privateMessages, isPrivate, currentRoom, roomUsers]);

  // ------------- Stop from Page Refrece ------------------------
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = ""; // Chrome requires this line
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);
  // -------------------------------------------------------------

  return (
    <div className={classes["chat-div"]}>
      <Header onClick={props.onMenuClicked} userData={privateUser} />
      <Display
        messages={!currentRoom ? messages : privateMessages[currentRoom] || []}
        id={userId}
      />
      <Input
        onMessage={
          !currentRoom ? sendMessageHandler : sendPrivateMessageHandler
        }
        onSendFiles={sendFilesHandler}
      />
    </div>
  );
};

export default Chat;
