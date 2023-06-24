import React, { Fragment } from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import SimpleSnackBar from "./SnackBar";

const Wraper = () => {
  const snackBar = useSelector((state) => state.ui.snackBar);

  return (
    <Fragment>
      <SimpleSnackBar
        status={snackBar.status}
        name={snackBar.name}
        message={snackBar.message}
      />
      <Outlet />
    </Fragment>
  );
};

export default Wraper;
