import { useEffect, useState } from "react";
import Heading from "../../../components/common/heading/Heading";
import SubHeading from "../../../components/common/heading/SubHeading";
import useGetIssues from "../../../hooks/citizen related/useGetIssues";
import Loading from "../../../components/loading/Loading";
import ErrorComponent from "../../../components/error/error page/ErrorComponent";
import AdminIssuesTable from "../../../components/dashboard/admin/AdminIssuesTable";

const AllReportedIssues = () => {
  const [searchText, setSearchText] = useState();
  const [debouncedSearch, setDebouncedSearch] = useState(searchText);

  //wait 1s after user stopped typing and then send the signal to backend to fetch
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchText);
    }, 500);
    return () => clearTimeout(handler);
  }, [searchText]);

  const { issues, isLoading, isError } = useGetIssues(debouncedSearch);

  if (isLoading) return <Loading />;
  if (isError) return <ErrorComponent />;

  return (
    <div className="lg:px-5 px-3  py-6 bg-white max-w-[95%] mx-auto rounded-3xl">
      <div className="space-y-12">
        {/* Title Section */}
        <div className="space-y-2">
          <Heading
            className={"text-4xl md:text-5xl"}
            label={"All Reported Issues"}
          />
          <SubHeading
            label={
              "View and manage all reported issues across the platform. Track status, priority, and take necessary actions as an administrator."
            }
          />
        </div>

        {/* Table Section */}
        <AdminIssuesTable
          data={issues}
          loading={isLoading}
          showSearch={true}
          showActions={true}
          searchText={searchText}
          onSearchChange={setSearchText}
          className="shadow-none p-0"
        />
      </div>
    </div>
  );
};

export default AllReportedIssues;
