import { Link, useNavigate } from "react-router";
import { getStatusBadge } from "../../../../utilities/getStatusBadge";
import { MdArrowOutward } from "react-icons/md";
import { ThumbsUp } from "lucide-react";
import useAuth from "../../../../hooks/auth & role/useAuth";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../hooks/auth & role/useAxiosSecure";
import useRole from "../../../../hooks/auth & role/useRole";

const IssueCard = ({ issue }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { role } = useRole();

  const axiosSecure = useAxiosSecure();
  //upvote
  const handleUpvote = async (issue) => {
    //not logged in
    if (!user) {
      navigate("/signin");
      return;
    }
    //admin can not upvote
    // if (role === "admin") {
    //   return Swal.fire({
    //     position: "center",
    //     icon: "error",
    //     title: "Your can not upvote admin",
    //     showConfirmButton: false,
    //     timer: 1500,
    //   });
    // }
    //if issuer tries to upvote on his posted issue
    if (user?.email === issue?.userEmail) {
      return Swal.fire({
        position: "center",
        icon: "error",
        title: "Your can not upvote on your issue",
        showConfirmButton: false,
        timer: 1500,
      });
    }
    //if issue is already resolved
    if (issue?.status === "resolved" || issue?.status === "closed") {
      return Swal.fire({
        position: "center",
        icon: "info",
        title: "Your can not upvote on a resolved issue",
        showConfirmButton: false,
        timer: 1500,
      });
    }
    //if same user upvote on the same issue
    const { data } = await axiosSecure.get(
      `/payments/check-upvote?issueId=${issue._id}&citizenEmail=${user.email}`
    );

    if (data.alreadyUpvoted) {
      return Swal.fire({
        position: "center",
        icon: "info",
        title: "You have already paid for this issue",
        showConfirmButton: false,
        timer: 1500,
      });
    }

    Swal.fire({
      title: "Are you sure?",
      text: "You will be charged $100 for one upvote",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#10b981",
      cancelButtonColor: "#ef4444",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate(`/upvote-payment/${issue._id}`);
      }
    });
  };
  console.log(issue);

  return (
    <div className="w-full max-w-sm" key={issue._id}>
      <div className="card-inner relative w-full h-72 bg-white rounded-3xl overflow-hidden">
        <div className="box w-full h-full bg-white rounded-3xl overflow-hidden relative">
          {/* Image Box */}
          <div className="absolute inset-0">
            <img
              src={issue?.photoURL}
              alt={issue?.title}
              className={`w-full h-full object-cover absolute inset-0 bg-black/60`}
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
            <Link
              to={`/issue/${issue?._id}`}
              className="iconBox absolute inset-2.5 bg-primary rounded-full flex items-center justify-center transition-transform duration-300 hover:scale-110 group"
              data-tip="View details"
            >
              <span className="text-white text-2xl">
                <MdArrowOutward className="w-10 h-10 group-hover:rotate-30 transition-all" />
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
            <p className="text-secondary text-sm">{issue?.location}</p>
          </div>
          <button
            className="btn btn-primary btn-outline group flex items-center gap-1 rounded-3xl"
            onClick={() => handleUpvote(issue)}
          >
            <ThumbsUp className="w-4 h-4 text-blue-500 group-hover:text-white transition-colors" />
            <span>Upvote {issue?.upvoteCount || 0}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default IssueCard;
