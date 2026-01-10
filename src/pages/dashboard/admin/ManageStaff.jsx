import { useRef, useState } from "react";
import Heading from "../../../components/common/heading/Heading";
import SubHeading from "../../../components/common/heading/SubHeading";
import AddStuffModal from "../../../components/modals/AddStuffModal";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/auth & role/useAxiosSecure";
import { Delete, Edit, PencilOff, PlusCircle, Trash } from "lucide-react";
import useStaffDelete from "../../../hooks/admin related/useStaffDelete";
import Swal from "sweetalert2";
import UpdateStuffModal from "../../../components/modals/UpdateStuffModal";
import Loading from "../../../components/loading/Loading";
import ErrorComponent from "../../../components/error/error page/ErrorComponent";
import toast from "react-hot-toast";

const ManageStaff = () => {
  const staffModalRef = useRef();
  const staffUpdateModalRef = useRef();
  const [currentStaff, setCurrentStaff] = useState({});
  const axiosSecure = useAxiosSecure();

  const {
    data: staffs = [],
    isLoading,
    isError,
    refetch: staffRefetch,
  } = useQuery({
    queryKey: ["all-staffs"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/staff");
      //console.log(data);
      return data.staff;
    },
  });
  //staff delete mutation
  const { mutateAsync: staffDelete } = useStaffDelete();
  //staff delete
  const handleDeleteStaff = async (staff) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#10b981",
        cancelButtonColor: "#ef4444",
        confirmButtonText: "Yes",
      });
      if (!result.isConfirmed) return;
      const res = await staffDelete(staff._id);
      if (res?.staff?.deletedCount) {
        await Swal.fire({
          title: "Deleted",
          text: `${staff?.staffName} has been deleted`,
          icon: "success",
        });
      }
    } catch (error) {
      toast.error(error.message);
      //console.log(error);
    }
  };
  //add staff modal
  const handleAddStuffModal = () => {
    staffModalRef.current.showModal();
  };
  //staff update modal
  const handleUpdateStaff = (staff) => {
    setCurrentStaff(staff);
    staffUpdateModalRef.current.showModal();
  };
  if (isLoading) return <Loading />;
  if (isError) return <ErrorComponent />;
  return (
    <div className="lg:px-5 px-3 py-6 bg-white max-w-[95%] mx-auto rounded-3xl">
      <div className="space-y-12">
        {/* Title Section */}
        <div className="flex justify-between items-center gap-10 md:flex-row flex-col">
          <div className="space-y-2">
            <Heading
              label={"Staff Management"}
              className={"text-4xl md:text-5xl pb-1"}
            />
            <SubHeading
              label={
                "Monitor, manage, and add new employees. Assign roles, update profiles, and remove accounts—all from one centralized dashboard."
              }
            />
          </div>
          <button
            className="btn btn-md btn-primary text-white rounded-3xl w-32 md:mt-0 mt-4 flex items-center justify-center gap-2 transition-transform duration-200 hover:bg-secondary"
            onClick={handleAddStuffModal}
          >
            <PlusCircle className="w-5 h-5" />
            Add Staff
          </button>
        </div>
        {/* Table Section */}
        {staffs.length === 0 ? (
          <p className="text-lg text-bold text-gray-500">
            No Staff Accounted created yet. Add a staff to see their information
            here.
          </p>
        ) : (
          <div className="overflow-x-auto rounded-lg shadow-lg border border-gray-200">
            {" "}
            <table className="table table-zebra w-full min-w-[700px]">
              {/* head */}
              <thead className="bg-gray-50">
                <tr>
                  <th className="py-3 px-4 border-b-2 border-blue-600/20">
                    No
                  </th>
                  <th className="py-3 px-4 border-b-2 border-blue-600/20 sticky left-0 z-10">
                    Name
                  </th>
                  <th className="py-3 px-4 border-b-2 border-blue-600/20">
                    Email
                  </th>
                  <th className="py-3 px-4 border-b-2 border-blue-600/20">
                    Phone Number
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
                    className={`transition-all duration-300 hover:shadow-md ${
                      staff.workStatus !== "available"
                        ? "bg-yellow-50/40 hover:bg-yellow-100/40"
                        : "bg-green-50 hover:bg-green-100/40"
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
                          <div className="font-extrabold text-gray-800 md:text-base text-sm">
                            {staff?.staffName}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-gray-600">{staff?.staffEmail}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-gray-700 font-medium">
                        {staff?.staffPhone}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`uppercase font-bold ${
                          staff?.workStatus === "available"
                            ? "text-green-700"
                            : "text-error"
                        }`}
                      >
                        {staff?.workStatus}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-3 justify-center items-center">
                        {/* Update Button */}
                        <button
                          className="w-8 h-8 bg-blue-100 rounded-full flex justify-center items-center cursor-pointer hover:scale-105 transition-transform duration-200"
                          onClick={() => handleUpdateStaff(staff)}
                        >
                          <Edit
                            size={16}
                            strokeWidth={2.5}
                            className="w-4 h-4 text-primary"
                          />{" "}
                        </button>

                        {/* Delete Button */}
                        <button
                          className="w-8 h-8 bg-red-100 rounded-full flex justify-center items-center cursor-pointer"
                          onClick={() => handleDeleteStaff(staff)}
                        >
                          <Trash
                            size={18}
                            strokeWidth={2.5}
                            className="w-4 h-4 text-error"
                          />{" "}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {/* Modal Section */}
        {/* Add Stuff Modal */}
        <AddStuffModal
          staffModalRef={staffModalRef}
          staffRefetch={staffRefetch}
        />
        {/* Update Stuff Modal */}
        <UpdateStuffModal
          currentStaff={currentStaff}
          staffUpdateModalRef={staffUpdateModalRef}
          staffRefetch={staffRefetch}
        />
      </div>
    </div>
  );
};

export default ManageStaff;
