import { useParams } from "react-router";
import useIssueDetails from "../../hooks/citizen related/useIssueDetails";
import Loading from "../../components/loading/Loading";
import IssueDetailsCard from "../../components/common/card/issue card/IssueDetailsCard";
import ErrorComponent from "../../components/error/error page/ErrorComponent";

const IssueDetails = () => {
  const { id } = useParams();
  //issue details data fetch
  const { issue, isLoading, isError } = useIssueDetails(id);

  if (isLoading) return <Loading />;
  if (isError) return <ErrorComponent />;
  return (
    <div>
      <div className="container mx-auto">
        {/* main content */}
        <IssueDetailsCard issue={issue} />
      </div>
    </div>
  );
};

export default IssueDetails;
