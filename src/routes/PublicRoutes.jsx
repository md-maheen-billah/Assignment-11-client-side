import { createBrowserRouter } from "react-router-dom";

import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import Root from "../layouts/Root/Root";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    // errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
    ],
  },
]);

export default router;
