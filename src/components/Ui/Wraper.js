import React from "react";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SimpleSnackBar from "./SnackBar";

const Wraper = () => {
  const snackBar = useSelector((state) => state.ui.snackBar);

  return (
    <div>
      <SimpleSnackBar
        status={snackBar.status}
        name={snackBar.name}
        message={snackBar.message}
      />
      <Outlet />
    </div>
  );
};

export default Wraper;
