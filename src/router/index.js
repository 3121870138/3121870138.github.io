import React from "react";

import { createBrowserRouter } from "react-router-dom";
import NotFound from "../layouts/NotFound";
import routers from '../config/routes'


const router = createBrowserRouter([
  ...routers,
  {
    path: "*",
    element: <NotFound />,
  }
]);

export default router;
