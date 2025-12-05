import { createBrowserRouter } from "react-router";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/home/Home";
import AuthLayout from "../layout/AuthLayout";
import SignIn from "../pages/auth/SignIn";
import SignUp from "../pages/auth/SignUp";
import DashboardLayout from "../layout/DashboardLayout";
import Dashboard from "../pages/dashboard/dashboard/Dashboard";
import ForgetPassword from "../pages/auth/ForgetPassword";

const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [{ index: true, element: <Home /> }],
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "/signin",
        element: <SignIn />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/forget-password",
        element: <ForgetPassword />,
      },
    ],
  },
  {
    path: "dashboard",
    element: <DashboardLayout />,
    children: [{ index: true, element: <Dashboard /> }],
  },
]);

export default router;
