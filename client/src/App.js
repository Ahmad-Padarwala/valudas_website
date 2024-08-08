import React from "react";
import { BrowserRouter } from "react-router-dom";
import PublicRoute from "./routes/PublicRoute.js";
import AdminRoute from "./routes/admin/AdminRoute.js";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <PublicRoute />
        <AdminRoute />
      </BrowserRouter>
    </>
  );
};

export default App;
