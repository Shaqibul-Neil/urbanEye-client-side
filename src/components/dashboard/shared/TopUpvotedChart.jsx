import { useNavigate } from "react-router";
import { MdArrowOutward } from "react-icons/md";
import { ThumbsUp } from "lucide-react";
import useAuth from "../../../hooks/auth & role/useAuth";
import Swal from "sweetalert2";
import StatusBadge from "../../common/card/issue card/StatusBadge";
import { motion, scale, useInView } from "framer-motion";

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
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="flex items-center gap-4 mb-4"
      >
        <div className="w-1 h-8 bg-gradient-to-b from-primary to-accent rounded-full"></div>
        <h3 className="text-lg font-bold text-secondary">{title}</h3>
      </motion.div>

      {!topIssue ? (
        <div className="flex items-center justify-center h-64 text-gray-500">
          <p>No upvoted issues found</p>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          {/* Issue Card */}
          <motion.div
            whileHover={{
              y: -1,
              scale: 1.01,
              transition: { duration: 1, ease: "easeInOut" },
            }}
            className="w-full max-w-sm transform duration-300 hover:scale-105"
          >
            <div className="card-inner relative w-full h-52 bg-white rounded-2xl overflow-hidden border border-gray-200">
              <div className="box w-full h-full bg-white rounded-2xl overflow-hidden relative">
                {/* Image Box */}
                <motion.div
                  whileHover={{
                    scale: 1.05,
                    transition: { duration: 0.3, ease: "easeOut" },
                  }}
                  transition={{ duration: 0.6 }}
                  className={`absolute inset-0 before:absolute before:inset-0 ${
                    topIssue.status === "closed" ? "before:bg-black/60" : ""
                  }`}
                >
                  <img
                    src={topIssue?.photoURL}
                    alt={topIssue?.title}
                    className="w-full h-full object-cover"
                  />
                </motion.div>

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
                <StatusBadge status={topIssue?.status} />
                {/* View Details Button */}
                <div className="icon absolute flex items-center justify-center w-16 h-16 rounded-tl-[50%]">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                    onClick={() => handleViewDetails(topIssue)}
                    className="iconBox bg-primary rounded-full flex items-center justify-center transition-transform duration-300 hover:scale-110 group z-50 cursor-pointer w-12 h-12"
                  >
                    <span className="text-white text-lg">
                      <MdArrowOutward className="w-6 h-6 group-hover:rotate-30 transition-all" />
                    </span>
                  </motion.button>
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
                <div className=" group flex items-center gap-1 rounded-3xl text-blue-500">
                  <ThumbsUp className="w-4 h-4" />
                  <span>Total Upvote</span>
                  <span>({topIssue?.totalUpvoteCount || 0})</span>{" "}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default TopUpvotedIssue;
