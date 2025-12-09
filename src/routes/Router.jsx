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
import AllReportedIssues from "../pages/dashboard/admin/AllReportedIssues";
import ManageStaff from "../pages/dashboard/admin/ManageStaff";
import ManageCitizens from "../pages/dashboard/admin/ManageCitizens";
import AdminRoutes from "./AdminRoutes";
import CitizenRoutes from "./CitizenRoutes";
import AssignedIssues from "../pages/dashboard/staff/AssignedIssues";
import StaffRoutes from "./StaffRoutes";
import PaymentsHistory from "../pages/dashboard/admin/PaymentsHistory";
import About from "../pages/about/About";
import AllIssues from "../pages/all issues/AllIssues";
import Contact from "../pages/contact/Contact";
import IssueDetails from "../pages/all issues/IssueDetails";
import UpvotePaymentPage from "../pages/upvote/UpvotePaymentPage";
import UpvotePaymentSuccess from "../pages/upvote/UpvotePaymentSuccess";

const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      { index: true, element: <Home /> },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/all-issues",
        element: <AllIssues />,
      },
      {
        path: "/issue/:id",
        element: (
          <PrivateRoutes>
            <IssueDetails />
          </PrivateRoutes>
        ),
      },
      {
        path: "/upvote-payment/:id",
        element: (
          <PrivateRoutes>
            <UpvotePaymentPage />
          </PrivateRoutes>
        ),
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/upvote-payment-success",
        element: <UpvotePaymentSuccess />,
      },
    ],
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
      //Admin Routes
      {
        path: "all-reported-issues",
        element: (
          <AdminRoutes>
            <AllReportedIssues />
          </AdminRoutes>
        ),
      },
      {
        path: "manage-staff",
        element: (
          <AdminRoutes>
            <ManageStaff />
          </AdminRoutes>
        ),
      },
      {
        path: "manage-citizens",
        element: (
          <AdminRoutes>
            <ManageCitizens />
          </AdminRoutes>
        ),
      },
      {
        path: "payments-history",
        element: (
          <AdminRoutes>
            <PaymentsHistory />
          </AdminRoutes>
        ),
      },
      //Staff Routes
      {
        path: "assigned-issues",
        element: (
          <StaffRoutes>
            <AssignedIssues />
          </StaffRoutes>
        ),
      },
      //Citizen Routes
      {
        path: "my-reported-issues",
        element: (
          <CitizenRoutes>
            <ReportedIssues />
          </CitizenRoutes>
        ),
      },
      {
        path: "report-issues",
        element: (
          <CitizenRoutes>
            <ReportIssues />
          </CitizenRoutes>
        ),
      },
      {
        path: "my-payments-history",
        element: (
          <CitizenRoutes>
            <MyPayments />
          </CitizenRoutes>
        ),
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
