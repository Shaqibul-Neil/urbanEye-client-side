import useStaffAssign from "../../hooks/admin related/useStaffAssign";
import Swal from "sweetalert2";

const AssignStaffModal = ({
  assignModalRef,
  staffs,
  assignedStaffIssue,
  selectedStaff,
  setSelectedStaff,
  staffRefetch,
}) => {
  //creating hash table for staffs
  const staffsMap = staffs.reduce((acc, staff) => {
    acc[staff._id] = staff;
    return acc;
  }, {});

  const handleSelectStaff = (e) => {
    const staffObj = staffsMap[e.target.value];
    setSelectedStaff(staffObj || {});
  };
  //assign staff mutation
  const { mutateAsync: staffAssign } = useStaffAssign();
  //assigning staff
  const handleAssign = async () => {
    setSelectedStaff({});
    //staffRefetch();
    const updatedIssue = {
      ...assignedStaffIssue,
      assignedStaff: {
        staffId: selectedStaff._id,
        staffName: selectedStaff.staffName,
        staffEmail: selectedStaff.staffEmail,
        staffPhone: selectedStaff.staffPhone,
      },
    };
    const res = await staffAssign(updatedIssue);

    if (res?.issueResult?.modifiedCount && res?.staffResult?.modifiedCount) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Staff has been assigned",
        showConfirmButton: false,
        timer: 1500,
      });
    }
    assignModalRef.current.close();
  };

  return (
    <dialog ref={assignModalRef} className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        <div className="space-y-4 mb-4">
          <h3 className="font-bold text-xl text-secondary">
            Assign Staff to Issue
          </h3>
          <p className="text-gray-600 text-sm">
            Select a staff member from the list below to assign them to this
            issue.
          </p>
        </div>

        {/* Staff Dropdown */}
        <div className="relative">
          <label className="block text-primary mb-1 font-medium">
            Available Staff ={" "}
            {staffs?.length < 10 ? `0${staffs?.length}` : `${staffs?.length}`}
          </label>
          <select
            className="select select-sm select-bordered w-full py-2 px-3 bg-base-200 border border-primary rounded-xl focus:ring-1 focus:ring-primary outline-none"
            value={selectedStaff?._id || ""}
            onChange={handleSelectStaff}
          >
            <option value="">Select Staff</option>
            {staffs.map((staff) => (
              <option key={staff._id} value={staff._id}>
                {staff.staffName}
              </option>
            ))}
          </select>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={() => assignModalRef.current.close()}
            className="btn btn-outline w-24 btn-sm text-secondary transition-transform duration-200 hover:scale-105"
          >
            Cancel
          </button>
          <button
            className="btn btn-primary w-24 btn-sm text-white transition-transform duration-200 hover:scale-105"
            onClick={handleAssign}
          >
            Assign Staff
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default AssignStaffModal;
