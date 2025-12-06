import { createBrowserRouter } from "react-router";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/home/Home";
import AuthLayout from "../layout/AuthLayout";
import SignIn from "../pages/auth/SignIn";
import SignUp from "../pages/auth/SignUp";
import DashboardLayout from "../layout/DashboardLayout";
import Dashboard from "../pages/dashboard/dashboard/Dashboard";
import ForgetPassword from "../pages/auth/ForgetPassword";
import ReportedIssues from "../pages/dashboard/citizen/ReportedIssues";
import ReportIssues from "../pages/dashboard/citizen/ReportIssues";
import MyPayments from "../pages/dashboard/citizen/MyPayments";
import Profile from "../pages/dashboard/profile/Profile";
import PaymentSuccess from "../pages/dashboard/payment/PaymentSuccess";
import PrivateRoutes from "./PrivateRoutes";

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
    element: (
      <PrivateRoutes>
        <DashboardLayout />
      </PrivateRoutes>
    ),
    children: [
      { index: true, element: <Dashboard /> },
      //Citizen Routes
      {
        path: "my-reported-issues",
        element: <ReportedIssues />,
      },
      {
        path: "report-issues",
        element: <ReportIssues />,
      },
      {
        path: "my-payments-history",
        element: <MyPayments />,
      },
      {
        path: "my-profile",
        element: <Profile />,
      },
      {
        path: "payment-success",
        Component: PaymentSuccess,
      },
    ],
  },
]);

export default router;
