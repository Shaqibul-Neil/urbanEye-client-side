import { useEffect, useState } from "react";
import useAxios from "../../hooks/auth & role/useAxios";
import { useNavigate } from "react-router";

import { Search } from "lucide-react";
import Loading from "../../components/loading/Loading";
import ErrorPage from "../../components/error/error page/ErrorPage";
import useAuth from "../../hooks/auth & role/useAuth";
import Swal from "sweetalert2";
import SubHeading from "../../components/common/heading/SubHeading";
import {
  PriorityFiltration,
  StatusFiltration,
} from "../../components/common/sidebarLinks/Filtration";
import IssueCard from "../../components/common/card/issue card/IssueCard";

const AllIssues = () => {
  const axiosInstance = useAxios();
  const [searchText, setSearchText] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(searchText);
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  //for pagination
  const [totalIssue, setTotalIssue] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  //for filter
  const [filters, setFilters] = useState({
    status: [],
    priority: [],
  });
  const limit = 6;

  //wait .5s after user stopped typing and then send the signal to backend to fetch
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchText);
    }, 500);
    return () => clearTimeout(handler);
  }, [searchText]);

  //all issues data fetch
  useEffect(() => {
    const issuesData = async () => {
      try {
        setLoading(true);
        const statusQuery = filters.status.length
          ? filters.status.join(",")
          : "";

        const priorityQuery = filters.priority.length
          ? filters.priority.join(",")
          : "";

        const { data } = await axiosInstance.get(
          `/issues/public/all-issues?searchText=${debouncedSearch}&limit=${limit}&skip=${
            currentPage * limit
          }&status=${statusQuery}&priority=${priorityQuery}`
        );
        setIssues(data?.issue);
        setTotalIssue(data?.total);
        const page = Math.ceil(data?.total / limit);
        setTotalPage(page);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    issuesData();
  }, [axiosInstance, debouncedSearch, currentPage, filters]);

  //reset current page value if search value changes
  useEffect(() => {
    setCurrentPage(0);
  }, [debouncedSearch]);
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

  if (loading) return <Loading />;
  if (error) return <ErrorPage />;

  return (
    <div className="py-12">
      <div className="container mx-auto lg:px-0 px-5">
        {/* Heading Section */}
        <div className="text-left space-y-12">
          <div className="space-y-2">
            <h1 className="text-4xl font-extrabold text-secondary leading-tight">
              {" "}
              Explore Public <span className="text-primary">Issues</span>
            </h1>
            <SubHeading
              label={`Browse through the latest issues reported by the community. Upvote the
          ones you care about, check priorities, and stay informed about your
          area.`}
            />
          </div>
          <div className="flex justify-between gap-4 items-center flex-col md:flex-row">
            {/* Total Issue */}
            <SubHeading
              label={`Total issue found : ${totalIssue}`}
              className="underline text-primary"
            />
            {/* Search Section */}
            <div className="col-span-1">
              <div className="flex md:justify-end justify-center mb-4">
                <div className="relative w-full">
                  <input
                    type="search"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    placeholder="Search..."
                    className="w-full py-2 pl-10 pr-3 bg-gray-100 border border-primary rounded-xl focus:ring-secondary focus:border-secondary focus:outline-none focus:ring-1"
                  />
                  <Search
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-primary"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Issues and Filter Grid */}
        <div className="grid lg:grid-cols-5 md:grid-cols-3 gap-4">
          {/* Filter Section */}
          <div className="drawer md:drawer-open mt-12">
            <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col items-center justify-center">
              {/* Page content here */}
              <label
                htmlFor="my-drawer-3"
                className="btn drawer-button lg:hidden"
              >
                Filter By
              </label>
            </div>
            <div className="drawer-side border text-xl text-primary text-center font-semibold rounded-3xl py-4">
              <label
                htmlFor="my-drawer-3"
                aria-label="close sidebar"
                className="drawer-overlay text-xl font-black"
              >
                Filter By
              </label>
              <ul className="menu lg:w-60 md:w-52 py-4 text-secondary">
                {/* Sidebar content here */}
                {/* By Status */}
                <label className="flex items-center justify-between cursor-pointer gap-3 mb-1 text-primary font-semibold text- underline">
                  {" "}
                  Status{" "}
                </label>
                <StatusFiltration filtrationProps={filtrationProps} />

                {/* By Priority */}
                <label className="flex items-center justify-between cursor-pointer gap-3 my-1 text-primary font-semibold text-base underline">
                  {" "}
                  Priority{" "}
                </label>
                <PriorityFiltration filtrationProps={filtrationProps} />
              </ul>
            </div>
          </div>
          {/* Issues */}
          <div className="lg:col-span-4 md:col-span-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-12">
            {issues.map((issue) => (
              <IssueCard issue={issue} key={issue._id} />
            ))}
          </div>
        </div>
        {/* Pagination Button */}
        <div className="flex justify-center gap-2 mt-10">
          {currentPage > 0 && (
            <button
              className="btn btn-primary btn-outline rounded-xl"
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              Prev
            </button>
          )}
          {[...Array(totalPage).keys()].map((_, i) => (
            <button
              onClick={() => setCurrentPage(i)}
              className={`btn btn-primary rounded-xl ${
                i === currentPage ? "" : "btn-outline"
              }`}
              key={i}
            >
              {i + 1}
            </button>
          ))}

          {currentPage < totalPage - 1 && (
            <button
              className="btn btn-primary btn-outline rounded-xl"
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllIssues;
