import { useNavigate } from "react-router";
import { getStatusBadge } from "../../../utilities/getStatusBadge";
import { MdArrowOutward } from "react-icons/md";
import { ThumbsUp } from "lucide-react";
import useAuth from "../../../hooks/auth & role/useAuth";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/auth & role/useAxiosSecure";

const TopUpvotedIssue = ({ data, title = "Top Upvoted Issue" }) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  // Get the top upvoted issue (first item in the array)
  const topIssue = data && data.length > 0 ? data[0] : null;

  // View details handler
  const handleViewDetails = (issue) => {
    if (!user) {
      Swal.fire({
        title: "Want to view details?",
        text: "Please login or register to see issue details",
        icon: "warning",
        showCancelButton: true,
        showDenyButton: true,
        confirmButtonText: "Login",
        denyButtonText: "Register",
        confirmButtonColor: "#2563eb",
        denyButtonColor: "#10b981",
        cancelButtonColor: "#ef4444",
      }).then((result) => {
        if (result.isConfirmed) navigate("/signin");
        else if (result.isDenied) navigate("/signup");
      });
      return;
    }

    navigate(`/issue/${issue._id}`);
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <h3 className="text-lg font-bold mb-4 text-secondary text-center">
        {title}
      </h3>

      {!topIssue ? (
        <div className="flex items-center justify-center h-64 text-gray-500">
          <p>No upvoted issues found</p>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          {/* Issue Card */}
          <div className="w-full max-w-xs transform duration-300 hover:scale-105">
            <div className="card-inner relative w-full h-52 bg-white rounded-2xl overflow-hidden border border-gray-200">
              <div className="box w-full h-full bg-white rounded-2xl overflow-hidden relative">
                {/* Image Box */}
                <div
                  className={`absolute inset-0 before:absolute before:inset-0 transform duration-300 hover:scale-110 ${
                    topIssue.status === "closed" ? "before:bg-black/60" : ""
                  }`}
                >
                  <img
                    src={topIssue?.photoURL}
                    alt={topIssue?.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Priority Badge */}
                <p
                  className={`px-2 py-1 text-xs font-bold rounded-full uppercase absolute top-2 right-2 ${
                    topIssue?.priority === "high"
                      ? "text-green-700 bg-green-100"
                      : "text-yellow-700 bg-yellow-100"
                  }`}
                >
                  {topIssue?.priority}
                </p>

                {/* Issue Status */}
                <p
                  className={`px-2 py-1 text-xs font-bold rounded-full uppercase absolute bottom-2 left-2 ${getStatusBadge(
                    topIssue?.status
                  )}`}
                >
                  {topIssue?.status}
                </p>

                {/* View Details Button */}
                <div className="icon absolute flex items-center justify-center w-16 h-16 rounded-tl-[50%]">
                  <button
                    onClick={() => handleViewDetails(topIssue)}
                    className="iconBox bg-primary rounded-full flex items-center justify-center transition-transform duration-300 hover:scale-110 group z-50 cursor-pointer w-12 h-12"
                  >
                    <span className="text-white text-lg">
                      <MdArrowOutward className="w-6 h-6 group-hover:rotate-30 transition-all" />
                    </span>
                  </button>
                </div>
              </div>
            </div>

            {/* Content Section */}
            <div className="p-3">
              <h4 className="capitalize text-xl font-bold tracking-tight text-secondary mb-1 line-clamp-2">
                {topIssue?.title}
              </h4>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-primary">{topIssue?.category}</p>
                  <p className="text-secondary text-sm truncate">
                    {topIssue?.location?.split(",")[0]}
                  </p>
                </div>
                <button className="btn btn-primary btn-outline group flex items-center gap-1 rounded-3xl">
                  <ThumbsUp className="w-4 h-4 text-blue-500 group-hover:text-white transition-colors" />
                  <span>{topIssue?.totalUpvoteCount || 0}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TopUpvotedIssue;
