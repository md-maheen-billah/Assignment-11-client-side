import { createBrowserRouter } from "react-router-dom";

import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import Root from "../layouts/Root/Root";
import PrivateRoute from "./PrivateRoute";
import FoodDetails from "../Pages/FoodDetails/FoodDetails";
import FoodPurchase from "../Pages/FoodPurchase/FoodPurchase";
import FoodAdd from "../Pages/FoodAdd/FoodAdd";
import AllFood from "../Pages/AllFood/AllFood";
import MyAdded from "../Pages/MyAdded/MyAdded";
import MyOrdered from "../Pages/MyOrdered/MyOrdered";

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
        path: "/all-food",
        element: <AllFood></AllFood>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/food-details/:id",
        element: (
          <PrivateRoute>
            <FoodDetails></FoodDetails>
          </PrivateRoute>
        ),
      },
      {
        path: "/food-purchase/:id",
        element: (
          <PrivateRoute>
            <FoodPurchase></FoodPurchase>
          </PrivateRoute>
        ),
      },
      {
        path: "/food-add",
        element: (
          <PrivateRoute>
            <FoodAdd></FoodAdd>
          </PrivateRoute>
        ),
      },
      {
        path: "/my-added-food",
        element: (
          <PrivateRoute>
            <MyAdded></MyAdded>
          </PrivateRoute>
        ),
      },
      {
        path: "/my-ordered-food",
        element: (
          <PrivateRoute>
            <MyOrdered></MyOrdered>
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
