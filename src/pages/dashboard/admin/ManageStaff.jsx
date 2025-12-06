import { useRef } from "react";
import Heading from "../../../components/common/heading/Heading";
import SubHeading from "../../../components/common/heading/SubHeading";
import AddStuffModal from "../../../components/modals/AddStuffModal";

const ManageStaff = () => {
  const staffModalRef = useRef();
  const handleAddStuffModal = () => {
    staffModalRef.current.showModal();
  };
  return (
    <div className="px-5">
      <div className="space-y-12">
        {/* Title Section */}
        <div className="flex justify-between items-center gap-10">
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
        {/* Modal Section */}
        <AddStuffModal staffModalRef={staffModalRef} />
      </div>
    </div>
  );
};

export default ManageStaff;
