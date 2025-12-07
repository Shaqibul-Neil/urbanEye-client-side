import { useRef } from "react";
import Heading from "../../../components/common/heading/Heading";
import SubHeading from "../../../components/common/heading/SubHeading";
import AddStuffModal from "../../../components/modals/AddStuffModal";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/auth & role/useAxiosSecure";
import { Delete, PencilOff } from "lucide-react";

const ManageStaff = () => {
  const staffModalRef = useRef();
  const axiosSecure = useAxiosSecure();
  const handleAddStuffModal = () => {
    staffModalRef.current.showModal();
  };
  const {
    data: staffs = [],
    isLoading,
    isError,
    refetch: staffRefetch,
  } = useQuery({
    queryKey: ["all-staffs"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/staff");
      return data.staff;
    },
  });
  const handleDeleteStaff = () => {};
  const handleUpdateStaff = () => {};
  return (
    <div className="lg:px-5 md:px-3 px-1 py-6">
      <div className="space-y-12">
        {/* Title Section */}
        <div className="flex justify-between items-center gap-10 md:flex-row flex-col">
          <div className="space-y-2">
            <Heading label={"Staff Management"} />
            <SubHeading
              label={
                "Monitor, manage, and add new employees. Assign roles, update profiles, and remove accounts—all from one centralized dashboard."
              }
            />
          </div>
          <button
            className="btn btn-lg btn-primary text-white"
            onClick={handleAddStuffModal}
          >
            Add Staff
          </button>
        </div>
        {/* Table Section */}
        <div className="overflow-x-auto rounded-lg shadow-lg border border-gray-200">
          <table className="table table-zebra w-full min-w-[700px]">
            {/* head */}
            <thead className="bg-gray-50">
              <tr>
                <th className="py-3 px-4 border-b-2 border-blue-600/20">No</th>
                <th className="py-3 px-4 border-b-2 border-blue-600/20 sticky left-0 z-10">
                  Name
                </th>
                <th className="py-3 px-4 border-b-2 border-blue-600/20">
                  Email
                </th>
                <th className="py-3 px-4 border-b-2 border-blue-600/20">
                  Work Status
                </th>
                <th className="py-3 px-4 border-b-2 border-blue-600/20">
                  Admin Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {staffs.map((staff, i) => (
                <tr
                  key={staff?._id}
                  className={`transition-all duration-300 hover:scale-[1.01] hover:shadow-md ${
                    staff.workStatus !== "available"
                      ? "bg-[#F9F5E5] hover:bg-yellow-100"
                      : ""
                  }`}
                >
                  <th
                    className={`py-3 px-4 border-l-4 ${
                      staff.workStatus !== "available"
                        ? "border-l-yellow-400"
                        : "border-l-[#6EE7B7]"
                    }`}
                  >
                    {i + 1}
                  </th>
                  <td className="py-3 px-4 sticky left-0 z-10">
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12 transition-transform duration-300 hover:scale-110">
                          <img
                            src={staff?.staffPhotoURL}
                            alt={staff?.staffName}
                            className="object-cover"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-extrabold text-gray-800 text-base">
                          {staff?.staffName}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="font-semibold text-gray-700">Email: </span>
                    <span className="text-gray-600">{staff?.staffEmail}</span>
                  </td>

                  <td className="py-3 px-4">
                    <span className="text-gray-700 font-medium">
                      {staff?.workStatus}
                    </span>
                  </td>
                  <td className="py-3 px-4 space-y-1">
                    {/* Update Button */}
                    <button
                      className="btn btn-info btn-sm text-white w-24 flex items-center gap-1 transition-transform duration-200 hover:scale-105"
                      onClick={() => handleUpdateStaff(staff)}
                    >
                      <PencilOff size={16} color="#ffffff" strokeWidth={1.5} />{" "}
                      Update
                    </button>

                    {/* Delete Button */}
                    <button
                      className="btn btn-error btn-sm text-white w-24 flex items-center gap-1 transition-transform duration-200 hover:scale-105"
                      onClick={() => handleDeleteStaff(staff)}
                    >
                      <Delete size={18} color="#ffffff" strokeWidth={2} />{" "}
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Modal Section */}
        <AddStuffModal
          staffModalRef={staffModalRef}
          staffRefetch={staffRefetch}
        />
      </div>
    </div>
  );
};

export default ManageStaff;
