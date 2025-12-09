import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../hooks/auth & role/useAxios";
import Loading from "../../loading/Loading";
import ErrorPage from "../../error/error page/ErrorPage";
import Heading from "../../common/heading/Heading";
import IssueCard from "../../common/card/issue card/IssueCard";

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
      console.log(res);
      return res?.data?.issue;
    },
  });
  console.log(issues);
  if (isLoading) return <Loading />;
  if (isError) return <ErrorPage />;
  return (
    <div className="space-y-16">
      {/* Title and subtitle */}
      <div className="space-y-4 text-center">
        <Heading
          className={"text-4xl md:text-5xl"}
          label={"Latest Resolved Issues"}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {issues.map((issue) => (
          <IssueCard key={issue._id} issue={issue} />
        ))}
      </div>
    </div>
  );
};

export default LatestResolved;
