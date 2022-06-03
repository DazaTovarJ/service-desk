import React from "react";
import {Outlet} from "react-router-dom";
import Navbar from "../../components/Navbar";

const Base = () => {
  return (
    <>
      <Navbar />
      <div className="container p-3">
        <Outlet />
      </div>
    </>
  );
};

export default Base;
