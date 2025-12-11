import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/auth & role/useAxiosSecure";
import useAuth from "../../../hooks/auth & role/useAuth";
import Loading from "../../../components/loading/Loading";
import IssueMetrics from "../../../components/dashboard/issue metrics/IssueMetrics";
import StaffIssueChart from "../../../components/dashboard/staff chart/StaffIssueChart";
import StaffPieChart from "../../../components/dashboard/staff chart/StaffIssuePieChart";
import StaffLatestAssign from "../../../components/dashboard/staff chart/StaffLatestAssign";
import { formatDate } from "../../../utilities/formatDate";
import ErrorComponent from "../../../components/error/error page/ErrorComponent";

const StaffDashBoard = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  //issue aggregation by staff changing issue status
  const {
    data: issuesAggregate = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["issues-stats", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/issues/staff/issue-aggregate`);

      return data?.dataAggregate;
    },
  });
  //total issue count
  const issueCount = issuesAggregate?.reduce(
    (accu, stats) => accu + stats.count,
    0
  );
  //fetching staffs today's task
  const {
    data: tasks = [],
    isLoading: taskLoading,
    isError: taskError,
  } = useQuery({
    queryKey: ["my-tasks", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/issues/staff/assigned/today/task`
      );
      return data?.tasks;
    },
  });

  //fetching staffs latest resolved task
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
  console.log(resolvedTasks);
  if (isLoading || taskLoading || resolveLoading) return <Loading />;
  if (isError || taskError || resolveError) return <ErrorComponent />;
  return (
    <div className="grid lg:grid-cols-4 gap-4 px-5">
      {/* Left Side Stats */}
      <div className="lg:col-span-3 space-y-4">
        {/* Issue Status Cards */}
        <div className="bg-white p-6 rounded-3xl space-y-4">
          <h2 className="text-lg text-secondary font-bold">Issue Metrics </h2>
          <div className="grid md:grid-cols-3 gap-2">
            <div
              className={`relative p-6 rounded-3xl shadow-2xl flex flex-col items-center justify-center transition-transform duration-500 hover:scale-105 text-secondary`}
            >
              <p className="text-xl md:text-base capitalize tracking-wide font-medium">
                Assigned
              </p>
              {/* Count */}
              <h4 className="text-2xl font-extrabold mb-2 mt-1">
                {issueCount}
              </h4>
            </div>
            {issuesAggregate.map((stat, i) => (
              <IssueMetrics key={i} stat={stat} />
            ))}
          </div>
        </div>

        {/* Issue Charts */}
        <div className="col-span-3">
          <div className="flex gap-4 flex-col md:flex-row">
            <div className="bg-white rounded-2xl shadow-2xl p-6 w-full">
              <h3 className="text-xl font-bold mb-8 text-secondary">
                Issue Overview
              </h3>
              <StaffIssueChart issuesAggregate={issuesAggregate} />
            </div>
            <div className="bg-white rounded-2xl shadow-2xl p-6 w-full">
              <h3 className="text-xl font-bold mb-8 text-secondary">
                Issue Charts
              </h3>
              <StaffPieChart issuesAggregate={issuesAggregate} />
            </div>
          </div>
        </div>
      </div>

      {/* Right Side */}

      <div className="col-span-1 space-y-4">
        {/* Latest Issues */}
        <div className="p-6 rounded-3xl">
          <div className=" space-y-4">
            <h3 className="text-lg text-secondary font-bold">Today's Task</h3>
            <div>
              {tasks.map((task) => (
                <StaffLatestAssign task={task} key={task._id} />
              ))}
            </div>
          </div>
        </div>

        {/* Latest Registered Users */}
        <div className="p-6 rounded-3xl">
          <div className="space-y-4">
            <h3 className="text-lg text-secondary font-bold">
              Recent Completed Task
            </h3>
            <div>
              {resolvedTasks.map((task) => (
                <div
                  className="flex items-center gap-4 px-2 py-2.5 rounded-3xl shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer transform hover:-translate-y-1 bg-white my-3"
                  key={task._id}
                >
                  {/* Profile / Photo */}

                  <div className="shrink-0 w-12 h-12">
                    <img
                      src={task?.photoURL}
                      alt={task?.title}
                      className="w-full h-full object-cover rounded-full border-2 border-primary"
                    />
                  </div>
                  {/* Text */}
                  <div className="flex flex-col justify-center">
                    <h3 className="text-sm text-secondary font-bold">
                      {task?.title}
                    </h3>
                    <h3 className="text-xs text-secondary">
                      <span className="font-semibold">Tracking Id:</span>{" "}
                      {task?.trackingId}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1">
                      {formatDate(task?.lastTimeline?.at)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffDashBoard;
