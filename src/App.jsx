import React, {useState, useEffect} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {onAuthStateChanged} from "firebase/auth";
import {auth} from "./firebase";
import Loader from "./components/Loader";
import PrivateRoute from "./components/PrivateRoute";
import Requests from "./pages/functions/Requests";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Base from "./pages/template/Base";

function App() {
  const [firebaseUser, setFirebaseUser] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setFirebaseUser(user);
      } else {
        setFirebaseUser(null);
      }
    });
  }, []);

  return firebaseUser !== false ? (
    <BrowserRouter>
      <Routes>
        <Route
          path="/service-desk"
          element={
            <Base
              firebaseUser={firebaseUser}
              setFirebaseUser={setFirebaseUser}
            />
          }
        >
          <Route index element={<Home user={firebaseUser} />} />
          <Route path="login" element={<Login />} />
          <Route
            path="request"
            element={
              <PrivateRoute>
                <Requests user={firebaseUser} />
              </PrivateRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  ) : (
    <Loader />
  );
}

export default App;
