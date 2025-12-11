import { formatDate } from "../../../utilities/formatDate";

const StaffLatestAssign = ({ task }) => {
  return (
    <div className="flex items-center gap-4 p-2 rounded-3xl shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer transform hover:-translate-y-1 bg-white my-3">
      {/* Profile / Photo */}
      <div className="shrink-0 w-12 h-12">
        <img
          src={task?.photoURL}
          alt={task?.title}
          className="w-full h-full object-cover rounded-full border-2 border-primary"
        />
      </div>

      {/* Text */}
      <div className="flex flex-col justify-center">
        <h3 className="text-sm text-secondary font-bold">{task?.title}</h3>
        <p className="text-xs text-gray-500 mt-1">
          {formatDate(task?.staffAssignedAt)}
        </p>
      </div>
    </div>
  );
};

export default StaffLatestAssign;
