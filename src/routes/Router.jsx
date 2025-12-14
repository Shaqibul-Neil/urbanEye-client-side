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
import ErrorPage from "../components/error/error page/ErrorPage";
import RouteTitle from "./RouteTitle";
import InvoicePaymentHistory from "../pages/dashboard/admin/InvoicePaymentHistory";

const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: (
          <RouteTitle title="Home">
            <Home />
          </RouteTitle>
        ),
      },
      {
        path: "/about",
        element: (
          <RouteTitle title="About">
            <About />
          </RouteTitle>
        ),
      },
      {
        path: "/all-issues",
        element: (
          <RouteTitle title="All Issues">
            <AllIssues />
          </RouteTitle>
        ),
      },
      {
        path: "/issue/:id",
        element: (
          <PrivateRoutes>
            <RouteTitle title="Issue Details">
              <IssueDetails />
            </RouteTitle>
          </PrivateRoutes>
        ),
      },
      {
        path: "/upvote-payment/:id",
        element: (
          <PrivateRoutes>
            <RouteTitle title="Upvote Payment">
              <UpvotePaymentPage />
            </RouteTitle>
          </PrivateRoutes>
        ),
      },
      {
        path: "/contact",
        element: (
          <RouteTitle title="Contact">
            <Contact />
          </RouteTitle>
        ),
      },
      {
        path: "/upvote-payment-success",
        element: (
          <RouteTitle title="Upvote Payment Success">
            <UpvotePaymentSuccess />
          </RouteTitle>
        ),
      },
    ],
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "/signin",
        element: (
          <RouteTitle title="Sign In">
            <SignIn />
          </RouteTitle>
        ),
      },
      {
        path: "/signup",
        element: (
          <RouteTitle title="Sign Up">
            <SignUp />
          </RouteTitle>
        ),
      },
      {
        path: "/forget-password",
        element: (
          <RouteTitle title="ForgetPassword">
            <ForgetPassword />
          </RouteTitle>
        ),
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
      {
        index: true,
        element: (
          <RouteTitle title="Dashboard">
            <Dashboard />
          </RouteTitle>
        ),
      },
      //Admin Routes
      {
        path: "all-reported-issues",
        element: (
          <AdminRoutes>
            <RouteTitle title="Admin - All Reported Issues">
              <AllReportedIssues />
            </RouteTitle>
          </AdminRoutes>
        ),
      },
      {
        path: "manage-staff",
        element: (
          <AdminRoutes>
            <RouteTitle title="Admin - Manage Staff">
              <ManageStaff />
            </RouteTitle>
          </AdminRoutes>
        ),
      },
      {
        path: "manage-citizens",
        element: (
          <AdminRoutes>
            <RouteTitle title="Admin - Manage Citizens">
              <ManageCitizens />
            </RouteTitle>
          </AdminRoutes>
        ),
      },
      {
        path: "payments-history",
        element: (
          <AdminRoutes>
            <RouteTitle title="Admin - Payments History">
              <PaymentsHistory />
            </RouteTitle>
          </AdminRoutes>
        ),
      },
      // {
      //   path: "invoice-payment-history",
      //   element: (
      //     <AdminRoutes>
      //       <RouteTitle title="Admin - invoice Payment History">
      //         <InvoicePaymentHistory />
      //       </RouteTitle>
      //     </AdminRoutes>
      //   ),
      // },
      //Staff Routes
      {
        path: "assigned-issues",
        element: (
          <StaffRoutes>
            <RouteTitle title="Staff - AssignedIssues">
              <AssignedIssues />
            </RouteTitle>
          </StaffRoutes>
        ),
      },
      //Citizen Routes
      {
        path: "my-reported-issues",
        element: (
          <CitizenRoutes>
            <RouteTitle title="Citizen - Reported Issues">
              <ReportedIssues />
            </RouteTitle>
          </CitizenRoutes>
        ),
      },
      {
        path: "report-issues",
        element: (
          <CitizenRoutes>
            <RouteTitle title="Citizen - Report Issues">
              <ReportIssues />
            </RouteTitle>
          </CitizenRoutes>
        ),
      },
      {
        path: "my-payments-history",
        element: (
          <CitizenRoutes>
            <RouteTitle title="Citizen - My Payments">
              <MyPayments />
            </RouteTitle>
          </CitizenRoutes>
        ),
      },
      {
        path: "my-profile",
        element: (
          <RouteTitle title="My Profile">
            <Profile />
          </RouteTitle>
        ),
      },
      {
        path: "payment-success",
        element: (
          <RouteTitle title="Payment Success">
            <PaymentSuccess />
          </RouteTitle>
        ),
      },
    ],
  },
]);

export default router;
