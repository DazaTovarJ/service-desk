import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import CreateRequest from "./pages/functions/CreateRequest";
import QueryRequest from "./pages/functions/QueryRequest";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Base from "./pages/template/Base";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Base />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route
            path="createRequest"
            element={
              <PrivateRoute>
                <CreateRequest />
              </PrivateRoute>
            }
          />
          <Route
            path="queryRequest"
            element={
              <PrivateRoute>
                <QueryRequest />
              </PrivateRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
