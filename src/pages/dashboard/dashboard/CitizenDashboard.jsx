import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/auth & role/useAxiosSecure";
import useAuth from "../../../hooks/auth & role/useAuth";
import Loading from "../../../components/loading/Loading";
import ErrorComponent from "../../../components/error/error page/ErrorComponent";
import useIssueAggregate from "../../../hooks/citizen related/useIssueAggregate";
import useAggregatePayment from "../../../hooks/payment related/useAggregatePayment";
import useTopUpvotedIssues from "../../../hooks/dashboard/useTopUpvotedIssues";
import CitizenDashboardLayout from "../../../components/dashboard/citizen/CitizenDashboardLayout";

const CitizenDashboard = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  // Total payments data aggregation
  const { paymentStats, paymentLoading, paymentError } = useAggregatePayment();

  // Issue status aggregation
  const {
    statusStats,
    isLoading: statusLoading,
    isError: statusError,
  } = useIssueAggregate();

  // Top upvoted issues
  const {
    topUpvotedIssues,
    isLoading: upvoteLoading,
    isError: upvoteError,
  } = useTopUpvotedIssues(5);

  // Calculate metrics
  const totalIssues =
    statusStats?.reduce((accu, stats) => accu + stats.count, 0) || 0;
  const resolvedIssues =
    statusStats?.find((stat) => stat._id === "resolved")?.count || 0;

  // Get latest 3 issues by user
  const {
    data: latestIssues = [],
    isLoading: issueLoading,
    isError: issueError,
  } = useQuery({
    queryKey: ["my-issues", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get("/issues/my-issues?limit=3");
      return res?.data?.issue;
    },
  });

  // Loading state
  const loading =
    paymentLoading || statusLoading || issueLoading || upvoteLoading;

  // Error state
  const error = paymentError || statusError || issueError || upvoteError;

  if (loading) return <Loading />;
  if (error) return <ErrorComponent />;

  return (
    <CitizenDashboardLayout
      // Metrics data
      totalIssues={totalIssues}
      resolvedIssues={resolvedIssues}
      statusStats={statusStats}
      // Chart data
      paymentStats={paymentStats}
      topUpvotedIssues={topUpvotedIssues}
      // Table data
      latestIssues={latestIssues}
      // Loading state
      loading={loading}
      // Links
      issuesLink="/dashboard/my-reported-issues"
    />
  );
};

export default CitizenDashboard;
