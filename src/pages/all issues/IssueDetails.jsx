import { useParams } from "react-router";
import useIssueDetails from "../../hooks/citizen related/useIssueDetails";
import Loading from "../../components/loading/Loading";
import ErrorPage from "../../components/error/error page/ErrorPage";
import IssueDetailsCard from "../../components/common/card/issue card/IssueDetailsCard";

const IssueDetails = () => {
  const { id } = useParams();
  //issue details data fetch
  const { issue, isLoading, isError } = useIssueDetails(id);

  console.log(id);
  console.log(issue);
  if (isLoading) return <Loading />;
  if (isError) return <ErrorPage />;
  return (
    <div>
      <title>UrbanEye - Issue Details</title>
      <div className="container mx-auto">
        {/* main content */}
        <IssueDetailsCard issue={issue} />
      </div>
    </div>
  );
};

export default IssueDetails;
