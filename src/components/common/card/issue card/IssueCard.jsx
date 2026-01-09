import { useNavigate } from "react-router";
import { getStatusBadge } from "../../../../utilities/getStatusBadge";
import { MdArrowOutward } from "react-icons/md";
import { ThumbsUp } from "lucide-react";
import useAuth from "../../../../hooks/auth & role/useAuth";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../hooks/auth & role/useAxiosSecure";

const IssueCard = ({ issue, onUpvoteSuccess }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  //const { role } = useRole();

  const axiosSecure = useAxiosSecure();

  // upvote
  const handleUpvote = async (issue) => {
    const issueInfo = { issueId: issue._id, userEmail: issue.userEmail };
    if (!user) {
      Swal.fire({
        title: "Want to upvote?",
        text: "Please login or register if new to share your thoughts",
        icon: "warning",
        showCancelButton: true, // Cancel button
        showDenyButton: true, // Register button
        confirmButtonText: "Login", // Login button
        denyButtonText: "Register", // Register button
        confirmButtonColor: "#2563eb",
        denyButtonColor: "#10b981",
        cancelButtonColor: "#ef4444",
      }).then((result) => {
        if (result.isConfirmed) {
          // Login clicked
          navigate("/signin");
        } else if (result.isDenied) {
          // Register clicked
          navigate("/signup");
        }
        // Cancel clicked
      });
      return;
    }

    if (user?.email === issue?.userEmail) {
      return Swal.fire({
        position: "center",
        icon: "error",
        title: "You cannot upvote your own issue",
        showConfirmButton: false,
        timer: 1500,
      });
    }

    if (
      issue?.status === "resolved" ||
      issue?.status === "closed" ||
      issue?.status === "rejected"
    ) {
      return Swal.fire({
        position: "center",
        icon: "info",
        title: "You cannot upvote a resolved issue",
        showConfirmButton: false,
        timer: 1500,
      });
    }

    try {
      const { data } = await axiosSecure.post(
        `/issues/${issue._id}/upvote`,
        issueInfo
      );

      // already upvoted handled by backend
      if (data.message === "Already upvoted") {
        return Swal.fire({
          position: "center",
          icon: "info",
          title: "You have already upvoted this issue",
          showConfirmButton: false,
          timer: 1500,
        });
      }

      // upvote success
      if (data.message === "Upvote added successfully") {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Upvote added successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        onUpvoteSuccess(issue._id);
      }
    } catch (err) {
      const msg =
        err?.response?.data?.message || "Failed to upvote. Try again later.";

      Swal.fire({
        position: "center",
        icon: "error",
        title: msg,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };
  //view details
  const handleViewDetails = (issue) => {
    if (!user) {
      Swal.fire({
        title: "Want to view details?",
        text: "Please login or register to see issue details",
        icon: "warning",
        showCancelButton: true, // Cancel
        showDenyButton: true, // Register
        confirmButtonText: "Login",
        denyButtonText: "Register",
        confirmButtonColor: "#2563eb",
        denyButtonColor: "#10b981",
        cancelButtonColor: "#ef4444",
      }).then((result) => {
        if (result.isConfirmed) navigate("/signin");
        else if (result.isDenied) navigate("/signup");
        // Cancel => do nothing
      });
      return;
    }

    // If logged in, navigate to issue details
    navigate(`/issue/${issue._id}`);
  };

  return (
    <div
      className="w-full max-w-sm transform duration-300 hover:scale-110"
      key={issue._id}
    >
      <div className="card-inner relative w-full h-72 bg-white rounded-3xl overflow-hidden">
        <div className="box w-full h-full bg-white rounded-3xl overflow-hidden relative">
          {/* Image Box */}
          <div
            className={`absolute inset-0 before:absolute before:inset-0  transform duration-300 hover:scale-110 ${
              issue.status === "closed" ? "before:bg-black/60" : ""
            }`}
          >
            <img
              src={issue?.photoURL}
              alt={issue?.title}
              className={`w-full h-full object-cover `}
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

          <div className="icon absolute bottom-1.5 right-1.5 w-24 h-24 rounded-tl-[50%] tooltip">
            <div className="tooltip-content">
              <div className="animate-bounce text-white text-sm font-black">
                View Details
              </div>
            </div>
            <button
              onClick={() => handleViewDetails(issue)}
              className="iconBox absolute inset-2.5 bg-primary rounded-full flex items-center justify-center transition-transform duration-300 hover:scale-110 group"
              data-tip="View details"
            >
              <span className="text-white text-2xl">
                <MdArrowOutward className="w-10 h-10 group-hover:rotate-30 transition-all" />
              </span>
            </button>
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
            <p className="text-secondary text-sm">{issue?.location}</p>
          </div>
          <button
            className="btn btn-primary btn-outline group flex items-center gap-1 rounded-3xl"
            onClick={() => handleUpvote(issue)}
          >
            <ThumbsUp className="w-4 h-4 text-blue-500 group-hover:text-white transition-colors" />
            <span>Upvote {issue?.totalUpvoteCount || 0}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default IssueCard;
