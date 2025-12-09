import { MdEmail } from "react-icons/md";
import { MapPin, ThumbsUp } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { getStatusBadge } from "../../../../utilities/getStatusBadge";
import useAuth from "../../../../hooks/auth & role/useAuth";
import EditIssueModal from "../../../modals/EditIssueModal";
import { useRef, useState } from "react";
import Swal from "sweetalert2";
import useDeleteIssue from "../../../../hooks/citizen related/useDeleteIssue";
import useMyInfo from "../../../../hooks/citizen related/useMyInfo";

const IssueDetailsCard = ({ issue }) => {
  const { user } = useAuth();
  const editIssueRef = useRef();
  const [currentIssue, setCurrentIssue] = useState({});
  const navigate = useNavigate();
  //delete mutation
  const { mutateAsync: deleteIssue } = useDeleteIssue();
  const { myInfo } = useMyInfo();
  //event handlers
  const handleEditIssues = (issue) => {
    // account blocked check
    if (myInfo?.isBlocked) {
      Swal.fire({
        icon: "error",
        title: "Account Blocked",
        text: "Your account is blocked. You cannot edit issues.",
      });
      return;
    }
    // only pending issues allowed
    if (issue?.status !== "pending") {
      Swal.fire({
        icon: "info",
        title: "Cannot Edit",
        text: "Only pending issues can be edited.",
      });
      return;
    }
    // else open modal
    setCurrentIssue(issue);
    editIssueRef.current.showModal();
  };
  const handleDeleteIssue = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You cant revert this",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#10b981",
        cancelButtonColor: "#ef4444",
        confirmButtonText: "Yes, Delete",
      });
      if (!result.isConfirmed) return;
      const res = await deleteIssue(id);

      if (res?.issue?.deletedCount) {
        navigate("/all-issues");
        //success popup
        await Swal.fire({
          title: "Deleted!",
          text: "Your issue has been deleted",
          icon: "success",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Something went wrong",
        text: error?.response?.data?.message || "Server error!",
        icon: "error",
      });
    }
  };
  //upvote
  const handleUpvote = (issue) => {
    if (!user) {
      navigate("/signin");
      return;
    }
    if (user?.email === issue?.userEmail) {
      return Swal.fire({
        position: "center",
        icon: "error",
        title: "Your can not upvote on your issue",
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
  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Back link */}
      <div className="mb-6">
        <Link to="/all-issues" className="text-sm font-medium text-primary ">
          &larr; Back to Available issues
        </Link>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* LEFT SIDE - IMAGE */}
        <div>
          <div className="rounded-3xl overflow-hidden shadow-md">
            <img
              src={issue?.photoURL}
              alt={issue?.title}
              className="rounded-3xl w-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>

        {/* RIGHT SIDE - TABS */}
        <div className="bg-white md:px-6 px-3">
          <Tabs>
            <TabList className="flex gap-4 border-b border-gray-200 pb-2">
              <Tab
                selectedClassName="text-primary border-b-2 border-primary"
                className="cursor-pointer py-1 font-extrabold tracking-tight hover:text-secondary focus:outline-none transition-color duration-300"
              >
                Issue Description
              </Tab>
              <Tab
                selectedClassName="text-primary border-b-2 border-primary"
                className="cursor-pointer py-1 font-extrabold tracking-tight hover:text-secondary focus:outline-none transition-color duration-300"
              >
                Reporter Information
              </Tab>
              <Tab
                selectedClassName="text-primary border-b-2 border-primary"
                className="cursor-pointer py-1 font-extrabold tracking-tight hover:text-secondary focus:outline-none transition-color duration-300"
              >
                Staff Information
              </Tab>
            </TabList>

            {/* issue DESCRIPTION TAB */}
            <TabPanel>
              <div className="space-y-4 mt-4 text-left">
                <h2 className="text-2xl font-bold text-secondary">
                  {issue?.title}
                </h2>
                <div className="flex gap-2">
                  <span
                    className={`badge badge-outline capitalize ${
                      issue?.priority === "high"
                        ? "text-green-700"
                        : "text-yellow-700"
                    }`}
                  >
                    {issue?.priority}
                  </span>
                  <span
                    className={`badge badge-outline capitalize ${getStatusBadge(
                      issue?.status
                    )}`}
                  >
                    {issue?.status}
                  </span>
                </div>

                <div className="space-y-2 mt-2 text-gray-600">
                  <p className="text-sm font-semibold">
                    Description :{" "}
                    <span className=" text-gray-600 font-normal">
                      {issue?.description}
                    </span>
                  </p>
                  <p className="text-sm">
                    <span className="font-semibold">Reported At :</span>{" "}
                    {new Date(issue?.createdAt).toLocaleDateString()}
                  </p>
                  <p className="text-sm mt-2 font-semibold">
                    Reported by :{" "}
                    <span className="font-normal">{issue?.userEmail}</span>
                  </p>
                  <div className="flex md:items-center gap-2 flex-col md:flex-row">
                    <div className="flex items-center gap-2">
                      <MapPin color="red" size={18} />{" "}
                      <span>{issue?.location}</span>
                    </div>
                  </div>
                </div>

                {user?.email === issue?.userEmail ? (
                  <div className="flex gap-2 items-center">
                    {issue?.status === "pending" && (
                      <button
                        className="magicBtn"
                        onClick={() => handleEditIssues(issue)}
                        style={{
                          "--btn-text": "'Edit'",
                          "--btn-bg": "white",
                          "--btn-text-color": "#2563eb",
                          "--btn-border": "#2563eb",
                        }}
                      />
                    )}
                    <button
                      className="magicBtn"
                      onClick={() => handleDeleteIssue(issue._id)}
                      style={{
                        "--btn-text": "'Delete'",
                        "--btn-bg": "white",
                        "--btn-text-color": "#ef4444",
                        "--btn-border": "#ef4444",
                      }}
                    />
                  </div>
                ) : (
                  <button
                    className="btn btn-primary btn-outline group flex items-center gap-1 rounded-3xl"
                    onClick={() => handleUpvote(issue)}
                  >
                    <ThumbsUp className="w-4 h-4 text-blue-500 group-hover:text-white transition-colors" />
                    <span>Upvote {issue?.upvote || ""}</span>
                  </button>
                )}
              </div>
            </TabPanel>

            {/* REPORTER INFORMATION TAB */}
            <TabPanel>
              <div className="space-y-4 mt-4 text-left">
                <div className="flex gap-4 md:items-center flex-col md:flex-row">
                  <div>
                    <p className="text-secondary">
                      <span className="font-semibold">Reporter Email : </span>
                      {issue?.userEmail}
                    </p>
                    {/* Other information about reporter like his image and details */}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 mt-3">
                  <button
                    className="btn"
                    onClick={() =>
                      (window.location.href = `mailto:${issue?.userEmail}`)
                    }
                  >
                    <span className="flex items-center gap-1">
                      <MdEmail size={18} /> <span>Contact Reporter</span>
                    </span>
                  </button>
                </div>
              </div>
            </TabPanel>

            {/* STAFF INFORMATION TAB */}
            <TabPanel>
              <div className="space-y-4 mt-4 text-left">
                <div className="">
                  {issue?.isAssignedStaff ? (
                    <>
                      <p className="text-secondary">
                        <span className="font-semibold">Staff Name : </span>{" "}
                        {issue?.assignedStaff?.staffName}
                      </p>
                      <p className="text-secondary">
                        <span className="font-semibold">Staff Email : </span>
                        {issue?.assignedStaff?.staffEmail}
                      </p>
                    </>
                  ) : (
                    <p className="text-base text-secondary font-semibold">
                      No Staff Assigned Yet
                    </p>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row gap-3 mt-3">
                  {issue?.isAssignedStaff && (
                    <button
                      className="btn"
                      onClick={() =>
                        (window.location.href = `mailto:${issue?.assignedStaff?.staffEmail}`)
                      }
                    >
                      <span className="flex items-center gap-1">
                        <MdEmail size={18} /> <span>Contact Staff</span>
                      </span>
                    </button>
                  )}
                </div>
              </div>
            </TabPanel>
          </Tabs>
        </div>
        {/*Edit issue Modal */}
        <EditIssueModal
          editIssueRef={editIssueRef}
          currentIssue={currentIssue}
        />
      </div>
    </div>
  );
};

export default IssueDetailsCard;
