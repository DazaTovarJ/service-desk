import React from "react";
import {Outlet} from "react-router-dom";
import Navbar from "../../components/Navbar";

const Base = ({firebaseUser, setFirebaseUser}) => {
  return (
    <>
      <Navbar firebaseUser={firebaseUser} setFirebaseUser={setFirebaseUser} />
      <div className="container p-3">
        <Outlet />
      </div>
    </>
  );
};

export default Base;
