import { useState } from "react";
import useIssueStatusChange from "../../hooks/staff related/useIssueStatusChange";
import Swal from "sweetalert2";

const statusList = ["pending", "in-progress", "working", "resolved", "closed"];

const ChangeStatusModal = ({ modalObj }) => {
  const { selectedIssue, statusModalRef, refetchAssignIssues } = modalObj;
  const [status, setStatus] = useState("");
  const currentStatusIndex = statusList.indexOf(selectedIssue?.status);
  const { mutateAsync: statusChange } = useIssueStatusChange();

  const handleStatus = async () => {
    try {
      if (!status) {
        return Swal.fire({
          icon: "warning",
          title: "Please select a status first",
          timer: 1200,
          showConfirmButton: false,
        });
      }
      const issueInfo = {
        issueId: selectedIssue._id,
        status: status,
      };
      const res = await statusChange(issueInfo);

      //status changed
      if (res?.issue?.modifiedCount === 1) {
        Swal.fire({
          position: "center",
          icon: "success",
          html: `Issue status changed to <span style="color:green; font-weight:bold; text-transform:uppercase;">${status}</span>`,
          showConfirmButton: false,
          timer: 1500,
        });
      } //  same status again
      else {
        Swal.fire({
          position: "center",
          icon: "info",
          title: "No changes made",
          text: "This issue already has the selected status.",
          showConfirmButton: false,
          timer: 1500,
        });
      }
      refetchAssignIssues();
      statusModalRef.current.close();
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Failed to update status",
        text:
          error?.response?.data?.message ||
          "Something went wrong. Please try again.",
        showConfirmButton: true,
      });
    }
  };

  return (
    <dialog ref={statusModalRef} className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        <div className="space-y-4 mb-4">
          <h3 className="font-bold text-xl text-secondary">
            Change Issue Status
          </h3>
          <p className="text-gray-600 text-sm">
            Update the status for the selected issue.
          </p>
        </div>

        {/* Staff Dropdown */}
        <div className="relative">
          <select
            className="select select-sm select-bordered w-44 font-semibold py-2 px-3 bg-base-200 border border-primary rounded-xl focus:ring-1 focus:ring-primary outline-none"
            defaultValue={selectedIssue?.status || ""}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option disabled value="">
              Change Status
            </option>
            {statusList.map((list, i) => (
              <option
                key={i}
                value={list}
                disabled={i !== currentStatusIndex + 1}
              >
                {list}
              </option>
            ))}
          </select>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={() => statusModalRef.current.close()}
            className="btn btn-outline w-24 btn-sm text-secondary transition-transform duration-200 hover:scale-105"
          >
            Cancel
          </button>
          <button
            className="btn btn-primary w-24 btn-sm text-white transition-transform duration-200 hover:scale-105"
            onClick={handleStatus}
          >
            Change
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default ChangeStatusModal;
