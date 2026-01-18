import { createBrowserRouter } from "react-router";
import { lazy, Suspense } from "react"; // Add this
import AuthLayout from "../layout/AuthLayout";
import PrivateRoutes from "./PrivateRoutes";
import AdminRoutes from "./AdminRoutes";
import CitizenRoutes from "./CitizenRoutes";
import StaffRoutes from "./StaffRoutes";
import ErrorPage from "../components/error/error page/ErrorPage";
import RouteTitle from "./RouteTitle";
import HomeLayout from "../layout/HomeLayout";
import Loading from "../components/loading/Loading";

// Lazy load heavy pages/components
const Home = lazy(() => import("../pages/home/Home"));
const SignIn = lazy(() => import("../pages/auth/SignIn"));
const SignUp = lazy(() => import("../pages/auth/SignUp"));
const MainLayout = lazy(() => import("../layout/MainLayout"));
const Dashboard = lazy(() => import("../pages/dashboard/dashboard/Dashboard"));
const DashboardLayout = lazy(() => import("../layout/DashboardLayout"));
const ForgetPassword = lazy(() => import("../pages/auth/ForgetPassword"));
const ReportedIssues = lazy(() =>
  import("../pages/dashboard/citizen/ReportedIssues")
);
const ReportIssues = lazy(() =>
  import("../pages/dashboard/citizen/ReportIssues")
);
const MyPayments = lazy(() => import("../pages/dashboard/citizen/MyPayments"));
const Profile = lazy(() => import("../pages/dashboard/profile/Profile"));
const PaymentSuccess = lazy(() =>
  import("../pages/dashboard/payment/PaymentSuccess")
);
const AllReportedIssues = lazy(() =>
  import("../pages/dashboard/admin/AllReportedIssues")
);
const ManageStaff = lazy(() => import("../pages/dashboard/admin/ManageStaff"));
const ManageCitizens = lazy(() =>
  import("../pages/dashboard/admin/ManageCitizens")
);
const AssignedIssues = lazy(() =>
  import("../pages/dashboard/staff/AssignedIssues")
);
const PaymentsHistory = lazy(() =>
  import("../pages/dashboard/admin/PaymentsHistory")
);
const About = lazy(() => import("../pages/about/About"));
const AllIssues = lazy(() => import("../pages/all issues/AllIssues"));
const Contact = lazy(() => import("../pages/contact/Contact"));
const IssueDetails = lazy(() => import("../pages/all issues/IssueDetails"));
const InvoicePaymentHistory = lazy(() =>
  import("../pages/dashboard/admin/InvoicePaymentHistory")
);
const BoostPaymentSuccess = lazy(() =>
  import("../pages/boost/BoostPaymentSuccess")
);
const BoostPaymentPage = lazy(() => import("../pages/boost/BoostPaymentPage"));
const TermsAndConditions = lazy(() =>
  import("../pages/terms privacy cookie/TermsAndConditions")
);
const PrivacyPolicy = lazy(() =>
  import("../pages/terms privacy cookie/PrivacyPolicy")
);
const CookiePolicy = lazy(() =>
  import("../pages/terms privacy cookie/CookiePolicy")
);
const JobPortal = lazy(() => import("../pages/job portal/JobPortal"));

// Loading component (create if needed)

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <RouteTitle title="Home">
        <HomeLayout />
      </RouteTitle>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/",
    element: (
      <Suspense fallback={<Loading />}>
        <MainLayout />
      </Suspense>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/about",
        element: (
          <Suspense fallback={<Loading />}>
            <RouteTitle title="About">
              <About />
            </RouteTitle>
          </Suspense>
        ),
      },
      {
        path: "/all-issues",
        element: (
          <Suspense fallback={<Loading />}>
            <RouteTitle title="All Issues">
              <AllIssues />
            </RouteTitle>
          </Suspense>
        ),
      },
      {
        path: "/issue/:id",
        element: (
          <PrivateRoutes>
            <Suspense fallback={<Loading />}>
              <RouteTitle title="Issue Details">
                <IssueDetails />
              </RouteTitle>
            </Suspense>
          </PrivateRoutes>
        ),
      },
      {
        path: "/boost-payment/:id",
        element: (
          <PrivateRoutes>
            <Suspense fallback={<Loading />}>
              <RouteTitle title="Boost Payment">
                <BoostPaymentPage />
              </RouteTitle>
            </Suspense>
          </PrivateRoutes>
        ),
      },
      {
        path: "/career",
        element: (
          <Suspense fallback={<Loading />}>
            <RouteTitle title="Career Opportunities">
              <JobPortal />
            </RouteTitle>
          </Suspense>
        ),
      },
      {
        path: "/contact",
        element: (
          <Suspense fallback={<Loading />}>
            <RouteTitle title="Contact">
              <Contact />
            </RouteTitle>
          </Suspense>
        ),
      },
      {
        path: "/terms",
        element: (
          <Suspense fallback={<Loading />}>
            <RouteTitle title="Terms & Conditions">
              <TermsAndConditions />
            </RouteTitle>
          </Suspense>
        ),
      },
      {
        path: "/privacy-policy",
        element: (
          <Suspense fallback={<Loading />}>
            <RouteTitle title="Privacy Policy">
              <PrivacyPolicy />
            </RouteTitle>
          </Suspense>
        ),
      },
      {
        path: "/cookie-policy",
        element: (
          <Suspense fallback={<Loading />}>
            <RouteTitle title="Cookie Policy">
              <CookiePolicy />
            </RouteTitle>
          </Suspense>
        ),
      },
      {
        path: "/boost-payment-success",
        element: (
          <Suspense fallback={<Loading />}>
            <RouteTitle title="Boost Payment Success">
              <BoostPaymentSuccess />
            </RouteTitle>
          </Suspense>
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
          <Suspense fallback={<Loading />}>
            <RouteTitle title="Sign In">
              <SignIn />
            </RouteTitle>
          </Suspense>
        ),
      },
      {
        path: "/signup",
        element: (
          <Suspense fallback={<Loading />}>
            <RouteTitle title="Sign Up">
              <SignUp />
            </RouteTitle>
          </Suspense>
        ),
      },
      {
        path: "/forget-password",
        element: (
          <Suspense fallback={<Loading />}>
            <RouteTitle title="ForgetPassword">
              <ForgetPassword />
            </RouteTitle>
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <Suspense fallback={<Loading />}>
        <PrivateRoutes>
          <DashboardLayout />
        </PrivateRoutes>
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<Loading />}>
            <RouteTitle title="Dashboard">
              <Dashboard />
            </RouteTitle>
          </Suspense>
        ),
      },
      // Admin Routes
      {
        path: "all-reported-issues",
        element: (
          <AdminRoutes>
            <Suspense fallback={<Loading />}>
              <RouteTitle title="Admin - All Reported Issues">
                <AllReportedIssues />
              </RouteTitle>
            </Suspense>
          </AdminRoutes>
        ),
      },
      {
        path: "manage-staff",
        element: (
          <AdminRoutes>
            <Suspense fallback={<Loading />}>
              <RouteTitle title="Admin - Manage Staff">
                <ManageStaff />
              </RouteTitle>
            </Suspense>
          </AdminRoutes>
        ),
      },
      {
        path: "manage-citizens",
        element: (
          <AdminRoutes>
            <Suspense fallback={<Loading />}>
              <RouteTitle title="Admin - Manage Citizens">
                <ManageCitizens />
              </RouteTitle>
            </Suspense>
          </AdminRoutes>
        ),
      },
      {
        path: "payments-history",
        element: (
          <AdminRoutes>
            <Suspense fallback={<Loading />}>
              <RouteTitle title="Admin - Payments History">
                <PaymentsHistory />
              </RouteTitle>
            </Suspense>
          </AdminRoutes>
        ),
      },
      // Staff Routes
      {
        path: "assigned-issues",
        element: (
          <StaffRoutes>
            <Suspense fallback={<Loading />}>
              <RouteTitle title="Staff - AssignedIssues">
                <AssignedIssues />
              </RouteTitle>
            </Suspense>
          </StaffRoutes>
        ),
      },
      // Citizen Routes
      {
        path: "my-reported-issues",
        element: (
          <CitizenRoutes>
            <Suspense fallback={<Loading />}>
              <RouteTitle title="Citizen - Reported Issues">
                <ReportedIssues />
              </RouteTitle>
            </Suspense>
          </CitizenRoutes>
        ),
      },
      {
        path: "report-issues",
        element: (
          <CitizenRoutes>
            <Suspense fallback={<Loading />}>
              <RouteTitle title="Citizen - Report Issues">
                <ReportIssues />
              </RouteTitle>
            </Suspense>
          </CitizenRoutes>
        ),
      },
      {
        path: "my-payments-history",
        element: (
          <CitizenRoutes>
            <Suspense fallback={<Loading />}>
              <RouteTitle title="Citizen - My Payments">
                <MyPayments />
              </RouteTitle>
            </Suspense>
          </CitizenRoutes>
        ),
      },
      {
        path: "my-profile",
        element: (
          <Suspense fallback={<Loading />}>
            <RouteTitle title="My Profile">
              <Profile />
            </RouteTitle>
          </Suspense>
        ),
      },
      {
        path: "payment-success",
        element: (
          <Suspense fallback={<Loading />}>
            <RouteTitle title="Payment Success">
              <PaymentSuccess />
            </RouteTitle>
          </Suspense>
        ),
      },
      {
        path: "invoice-payment-history",
        element: (
          <Suspense fallback={<Loading />}>
            <RouteTitle title="Invoice Payment History">
              <InvoicePaymentHistory />
            </RouteTitle>
          </Suspense>
        ),
      },
    ],
  },
]);

export default router;
