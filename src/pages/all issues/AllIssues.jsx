import { useEffect, useState } from "react";
import useAxios from "../../hooks/auth & role/useAxios";
import { useQuery } from "@tanstack/react-query";
import { Link, Navigate, useNavigate } from "react-router";
import { MdArrowOutward } from "react-icons/md";
import { getStatusBadge } from "../../utilities/getStatusBadge";
import { Search, ThumbsUp } from "lucide-react";
import Loading from "../../components/loading/Loading";
import ErrorPage from "../../components/error/error page/ErrorPage";
import useAuth from "../../hooks/auth & role/useAuth";
import Swal from "sweetalert2";
import Heading from "../../components/common/heading/Heading";
import SubHeading from "../../components/common/heading/SubHeading";

const AllIssues = () => {
  const axiosInstance = useAxios();
  const { user } = useAuth();
  const [searchText, setSearchText] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(searchText);
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  //for pagination
  const [totalIssue, setTotalIssue] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const limit = 3;
  const navigate = useNavigate();
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
        const { data } = await axiosInstance.get(
          `/issues/public/all-issues?searchText=${debouncedSearch}&limit=${limit}&skip=${
            currentPage * limit
          }`
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
  }, [axiosInstance, debouncedSearch, currentPage]);

  //reset current page value if search value changes
  useEffect(() => {
    setCurrentPage(0);
  }, [debouncedSearch]);
  //upvote
  const handleUpvote = (issue) => {
    if (!user) {
      navigate("/signin");
      return;
    }
    if (user?.email === issue?.userEmail) {
      return Swal.fire({
        position: "center",
        icon: "error",
        title: "Your can not upvote on your issue",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  if (loading) return <Loading />;
  if (error) return <ErrorPage />;

  return (
    <div className="container mx-auto lg:px-0 px-5">
      {/* Heading Section */}
      <div className="text-left space-y-6 my-12">
        <div className="space-y-2">
          <Heading label={"Explore Public Issues"} />
          <SubHeading
            label={`Browse through the latest issues reported by the community. Upvote the
          ones you care about, check priorities, and stay informed about your
          area.`}
          />
        </div>
        <div className="grid grid-cols-3 gap-2 items-center">
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
          {/* Filter */}
        </div>
      </div>
      {/* Issues Grid */}
      <div className="grid lg:grid-cols-3 md: md:grid-cols-2 grid-cols-1 gap-4">
        {issues.map((issue) => (
          <div className="card w-full max-w-sm" key={issue._id}>
            <div className="card-inner relative w-full h-72 bg-white rounded-3xl overflow-hidden">
              <div className="box w-full h-full bg-white rounded-3xl overflow-hidden relative">
                {/* Image Box */}
                <div className="imgBox absolute inset-0">
                  <img
                    src={issue?.photoURL}
                    alt={issue?.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Priority Badge */}
                <p
                  className={`px-3 py-1 text-xs font-bold rounded-full uppercase absolute top-4 right-4 ${
                    issue?.priority === "high"
                      ? "text-green-700 bg-green-100"
                      : "text-yellow-700 bg-yellow-100"
                  }`}
                >
                  {issue?.priority}
                </p>

                {/* Issue Status */}
                <p
                  className={`px-3 py-1 text-xs font-bold rounded-full uppercase absolute bottom-4 left-4 ${getStatusBadge(
                    issue?.status
                  )}`}
                >
                  {issue?.status}
                </p>

                <div className="icon absolute bottom-1.5 right-1.5 w-24 h-24 rounded-tl-[50%]">
                  <Link className="iconBox absolute inset-2.5 bg-primary rounded-full flex items-center justify-center transition-transform duration-300 hover:scale-110">
                    <span className="text-white text-2xl">
                      <MdArrowOutward className="w-10 h-10" />
                    </span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Content Section */}
            <div className="p-4">
              <h3 className="capitalize text-xl font-extrabold tracking-tight text-secondary mb-1">
                {issue?.title}
              </h3>
              <div className="flex justify-between items-center">
                <div>
                  <p className="mt-2 text-sm text-primary">{issue?.category}</p>
                  <p className="text-secondary text-base">{issue?.location}</p>
                </div>
                <button
                  className="btn btn-primary btn-outline group flex items-center gap-1"
                  onClick={() => handleUpvote(issue)}
                >
                  <ThumbsUp className="w-4 h-4 text-blue-500 group-hover:text-white transition-colors" />
                  <span>Upvote {issue?.upvote || 0}</span>
                </button>
              </div>
            </div>
          </div>
        ))}
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
  );
};

export default AllIssues;
