import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/auth & role/useAxiosSecure";
import useAuth from "../../../hooks/auth & role/useAuth";
import Loading from "../../../components/loading/Loading";
import ErrorComponent from "../../../components/error/error page/ErrorComponent";
import StaffDashboardLayout from "../../../components/dashboard/staff/StaffDashboardLayout";

const StaffDashBoard = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  // Issue aggregation by staff changing issue status
  const {
    data: issuesAggregate = [],
    isLoading: statusLoading,
    isError: statusError,
  } = useQuery({
    queryKey: ["issues-stats", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/issues/staff/issue-aggregate`);
      return data?.dataAggregate;
    },
  });

  // Calculate total issue count
  const totalIssues = issuesAggregate?.reduce((accu, stats) => accu + stats.count, 0) || 0;
  const resolvedIssues = issuesAggregate?.find(stat => stat._id === "resolved")?.count || 0;

  // Fetching staff's today's task
  const {
    data: tasks = [],
    isLoading: taskLoading,
    isError: taskError,
  } = useQuery({
    queryKey: ["my-tasks", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/issues/staff/assigned/today/task`);
      return data?.tasks;
    },
  });

  // Fetching staff's latest resolved task
  const {
    data: resolvedTasks = [],
    isLoading: resolveLoading,
    isError: resolveError,
  } = useQuery({
    queryKey: ["my-tasks", user?.email, "resolved"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/issues/resolved/staff/latest`);
      return data?.tasks;
    },
  });

  // Loading state
  const loading = statusLoading || taskLoading || resolveLoading;

  // Error state
  const error = statusError || taskError || resolveError;

  if (loading) return <Loading />;
  if (error) return <ErrorComponent />;

  return (
    <StaffDashboardLayout
      // Metrics data
      totalIssues={totalIssues}
      resolvedIssues={resolvedIssues}
      statusStats={issuesAggregate}
      
      // Table data
      todayTasks={tasks}
      completedTasks={resolvedTasks}
      
      // Loading state
      loading={loading}
    />
  );
};

export default StaffDashBoard;
