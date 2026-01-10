import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../hooks/auth & role/useAxios";
import Loading from "../../loading/Loading";
import IssueCard from "../../common/card/issue card/IssueCard";
import ErrorComponent from "../../error/error page/ErrorComponent";

const LatestResolved = () => {
  const axiosInstance = useAxios();
  const {
    data: issues = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["my-issues"],
    queryFn: async () => {
      const res = await axiosInstance.get(`/issues/latest/resolved-issues`);
      return res?.data?.issue;
    },
  });

  if (isLoading) return <Loading />;
  if (isError) return <ErrorComponent />;
  return (
    <div className="space-y-16">
      {/* Title and subtitle */}
      <div className="space-y-4 text-center">
        <h2 className="font-extrabold text-primary tracking-tight text-4xl md:text-5xl">
          Latest <span className="text-secondary">Resolved</span> Issues
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {issues.map((issue) => (
          <IssueCard key={issue._id} issue={issue} />
        ))}
      </div>
    </div>
  );
};

export default LatestResolved;
