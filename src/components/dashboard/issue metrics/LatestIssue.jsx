import useRole from "../../../hooks/auth & role/useRole";
import { formatDate } from "../../../utilities/formatDate";
import Loading from "../../loading/Loading";

const LatestIssue = ({ latestIssue }) => {
  const { role, roleLoading } = useRole();
  if (roleLoading) return <Loading />;
  return (
    <div>
      {latestIssue.map((latest) => (
        <div
          key={latest._id}
          className="flex items-center gap-4 p-2 rounded-3xl shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer transform hover:-translate-y-1 bg-white my-3"
        >
          {/* Profile / Photo */}
          <div className="shrink-0 w-12 h-12">
            <img
              src={latest?.photoURL}
              alt={latest?.title}
              className="w-full h-full object-cover rounded-full border-2 border-primary"
            />
          </div>

          {/* Text */}
          <div className="flex flex-col justify-center">
            <h3 className="text-sm text-secondary">{latest?.title}</h3>
            <p className="text-xs text-gray-500 mt-1">
              {role === "admin"
                ? latest?.userEmail
                : formatDate(latest?.createdAt)}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LatestIssue;
