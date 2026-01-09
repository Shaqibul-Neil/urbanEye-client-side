import { useState } from "react";
import Heading from "../../../components/common/heading/Heading";
import SubHeading from "../../../components/common/heading/SubHeading";
import Loading from "../../../components/loading/Loading";
import {
  PriorityFiltration,
  StatusFiltration,
} from "../../../components/common/sidebarLinks/Filtration";
import useFilteredIssues from "../../../hooks/citizen related/useFilteredIssue";
import ErrorComponent from "../../../components/error/error page/ErrorComponent";
import ReusableIssuesTable from "../../../components/dashboard/shared/ReusableIssuesTable";

const ReportedIssues = () => {
  const [filters, setFilters] = useState({
    status: [],
    priority: [],
  });

  //dependencies
  const { issues, isLoading, isError } = useFilteredIssues(filters);

  //filtration handler
  const handleCheckboxChange = (type, value) => {
    setFilters((prev) => {
      const exists = prev[type].includes(value);

      return {
        ...prev,
        [type]: exists
          ? prev[type].filter((v) => v !== value)
          : [...prev[type], value],
      };
    });
  };
  const filtrationProps = { filters: filters, onChange: handleCheckboxChange };
  if (isLoading) return <Loading />;
  if (isError) return <ErrorComponent />;
  return (
    <div className="px-5">
      <div className="space-y-12">
        {/* Title Section */}
        <div className="flex gap-3 justify-between items-center md:flex-row flex-col">
          <div className="space-y-2">
            <Heading
              label={"My Reported Issues"}
              className={"text-4xl md:text-5xl pb-1"}
            />
            <SubHeading
              label={
                "Track the status of all the issues you have reported and see updates in real-time."
              }
            />
          </div>

          {/* Filter Section */}
          <div className="drawer w-32">
            <input id="my-drawer-1" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col items-center justify-center">
              {/* Page content here */}
              <label
                htmlFor="my-drawer-1"
                className="btn drawer-button btn-outline btn-primary"
              >
                Filter By
              </label>
            </div>
            <div className="drawer-side text-xl text-primary text-center font-semibold">
              <label
                htmlFor="my-drawer-1"
                aria-label="close sidebar"
                className="drawer-overlay w-full"
              >
                Filter By
              </label>
              <ul className="menu md:w-lg w-11/12 mx-auto md:p-10 p-6 text-secondary bg-white rounded-3xl my-auto">
                {/* Sidebar content here */}
                {/* By Status */}
                <div className="flex gap-3 items-start md:flex-row flex-col">
                  <div>
                    <label className="flex items-center justify-between cursor-pointer gap-3 mb-1 text-primary font-semibold text-base underline">
                      {" "}
                      Status{" "}
                    </label>
                    <StatusFiltration filtrationProps={filtrationProps} />
                  </div>
                  <div>
                    {/* By Priority */}
                    <label className="flex items-center justify-between cursor-pointer gap-3 text-primary font-semibold text-base underline">
                      {" "}
                      Priority{" "}
                    </label>
                    <PriorityFiltration filtrationProps={filtrationProps} />
                  </div>
                </div>
              </ul>
            </div>
          </div>
        </div>
        {/* Table Section */}
        <ReusableIssuesTable
          title=""
          data={issues}
          loading={isLoading}
          showActions={true}
          className="shadow-none p-0"
        />
      </div>
    </div>
  );
};

export default ReportedIssues;
