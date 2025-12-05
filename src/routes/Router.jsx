import { createBrowserRouter } from "react-router";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/home/Home";

const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [{ index: true, element: <Home /> }],
  },
]);

export default router;
