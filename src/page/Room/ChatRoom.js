import React, { useState } from "react";
import Chat from "../../components/Room/Chat";
import RoomBar from "../../components/Room/RoomBar";
import classes from "./ChatRoom.module.css";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../../store/ui-slice";
import { userActions } from "../../store/user-slice";

const ChatRoom = () => {
  const dispatch = useDispatch();
  const [showManu, setShowManu] = useState(false);
  const activeUser = useSelector((state) => state.user.activeUser);
  const [isPrivate, setIsPrivate] = useState(false);
  const userDetails = useSelector((state) => state.user.userDetails);
  const changeRoomBarStateHandler = () =>
    setShowManu((prevState) => !prevState);
  const closeRoomBarHandler = () => setShowManu(false);

  const privateRoomHandler = (userData, privateRoom) => {
    dispatch(userActions.setActiveUser(userData));
    setIsPrivate(true);
    dispatch(uiActions.setCurruntRoom(privateRoom));
    closeRoomBarHandler();
  };
  const openRoomHandler = (data) => {
    closeRoomBarHandler();
    if (data.id === "GROUPID") {
      dispatch(userActions.setActiveUser(null));
      dispatch(uiActions.setCurruntRoom(null));
      return;
    }
    dispatch(userActions.setActiveUser(data));
    dispatch(uiActions.setCurruntRoom(userDetails.privateRoom[data.id]));
  };
  const changeToPublicHandler = () => {
    dispatch(userActions.setActiveUser(null));
    dispatch(uiActions.setCurruntRoom(null));
    setIsPrivate(false);
  };
  return (
    <div className={classes["container-div"]}>
      <RoomBar
        isOpen={showManu}
        onClick={changeRoomBarStateHandler}
        onJoinToPrivateRoom={privateRoomHandler}
        onChangeRoom={openRoomHandler}
        onChangeToPublic={changeToPublicHandler}
        activeUserId={activeUser?.id}
      />
      <Chat
        privateUser={activeUser}
        onMenuClicked={changeRoomBarStateHandler}
        isPrivate={isPrivate}
        onChangeToPublic={changeToPublicHandler}
      />
    </div>
  );
};

export default ChatRoom;
