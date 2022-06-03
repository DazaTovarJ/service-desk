// import {signOut} from "firebase/auth";
import React from "react";
// import {Link, NavLink, useNavigate} from "react-router-dom";
import {Link, NavLink} from "react-router-dom";
// import {auth} from "../firebase";

const Navbar = ({firebaseUser, setFirebaseUser}) => {
  // const navigate = useNavigate();

  /* const signUserOut = async () => {
    await signOut(auth);
    setFirebaseUser(null);
    navigate("/login");
  }; */

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">
          Mesa de Servicio
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink
                to="/"
                className={({isActive}) =>
                  `nav-link${isActive ? " active" : ""}`
                }
              >
                Inicio
              </NavLink>
            </li>
            {/* {firebaseUser != null ? (
              <li className="nav-item">
                <NavLink
                  to="/admin"
                  className={({isActive}) =>
                    `nav-link${isActive ? " active" : ""}`
                  }
                >
                  Admin
                </NavLink>
              </li>
            ) : null}
            <li>
              {firebaseUser !== null ? (
                <NavLink
                  to=""
                  className={({isActive}) =>
                    `nav-link${isActive ? " active" : ""}`
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    signUserOut();
                  }}
                >
                  Cerrar sesión
                </NavLink>
              ) : (
                <NavLink
                  to="/login"
                  className={({isActive}) =>
                    `nav-link${isActive ? " active" : ""}`
                  }
                >
                  Login
                </NavLink>
              )}
            </li> */}
            <NavLink
              to="/login"
              className={({isActive}) => `nav-link${isActive ? " active" : ""}`}
            >
              Iniciar Sesión
            </NavLink>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
