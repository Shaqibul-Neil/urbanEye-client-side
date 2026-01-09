import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/auth & role/useAxiosSecure";
import Loading from "../../../components/loading/Loading";
import useAggregatePayment from "../../../hooks/payment related/useAggregatePayment";
import useIssueAggregate from "../../../hooks/citizen related/useIssueAggregate";
import ErrorComponent from "../../../components/error/error page/ErrorComponent";
import useTopUpvotedIssues from "../../../hooks/dashboard/useTopUpvotedIssues";
import AdminDashboardLayout from "../../../components/dashboard/admin/AdminDashboardLayout";

const AdminDashboard = () => {
  const axiosSecure = useAxiosSecure();
  
  // Issue status fetch data aggregation
  const { statusStats, isLoading: statusLoading, isError: statusError } = useIssueAggregate();
  
  // Total payments data aggregation
  const { paymentStats, paymentLoading, paymentError } = useAggregatePayment();
  
  // Top upvoted issues
  const { topUpvotedIssues, isLoading: upvoteLoading, isError: upvoteError } = useTopUpvotedIssues(5);

  // Calculate total issues
  const totalIssues = statusStats?.reduce((accu, stats) => accu + stats.count, 0) || 0;
  const resolvedIssues = statusStats?.find(stat => stat._id === "resolved")?.count || 0;

  // Latest issues for admin dashboard
  const {
    data: latestIssue = [],
    isLoading: latestLoading,
    isError: latestError,
  } = useQuery({
    queryKey: ["latest-issue"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/issues/latest/admin");
      return data?.issue;
    },
  });

  // Latest registered users
  const {
    data: latestUsers = [],
    isLoading: latestUsersLoading,
    isError: latestUsersError,
  } = useQuery({
    queryKey: ["latest-user"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/users/latest/registered-users");
      return data?.user;
    },
  });

  // Loading state
  const loading = statusLoading || paymentLoading || latestLoading || 
                  latestUsersLoading || upvoteLoading;

  // Error state
  const error = statusError || paymentError || latestError || 
                latestUsersError || upvoteError;

  if (loading) return <Loading />;
  if (error) return <ErrorComponent />;

  return (
    <AdminDashboardLayout
      // Metrics data
      totalIssues={totalIssues}
      resolvedIssues={resolvedIssues}
      statusStats={statusStats}
      
      // Chart data
      paymentStats={paymentStats}
      topUpvotedIssues={topUpvotedIssues}
      
      // Table data
      latestIssues={latestIssue}
      latestUsers={latestUsers}
      
      // Loading state
      loading={loading}
    />
  );
};

export default AdminDashboard;
