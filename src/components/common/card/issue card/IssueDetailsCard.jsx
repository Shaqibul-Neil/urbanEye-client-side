import { MdEmail } from "react-icons/md";
import { MapPin, ThumbsUp } from "lucide-react";
import { useNavigate } from "react-router";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { getStatusBadge } from "../../../../utilities/getStatusBadge";
import useAuth from "../../../../hooks/auth & role/useAuth";
import EditIssueModal from "../../../modals/EditIssueModal";
import { useRef, useState } from "react";
import Swal from "sweetalert2";
import useDeleteIssue from "../../../../hooks/citizen related/useDeleteIssue";
import useMyInfo from "../../../../hooks/citizen related/useMyInfo";
import VerticalTimeline from "../../timeline/VerticalTimeline";
import { FaTasks } from "react-icons/fa";
import Heading from "../../heading/Heading";
import StatusCard from "../status card/StatusCard";
import useAxiosSecure from "../../../../hooks/auth & role/useAxiosSecure";

const IssueDetailsCard = ({ issue }) => {
  const { user } = useAuth();
  const editIssueRef = useRef();
  const [currentIssue, setCurrentIssue] = useState({});
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
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
  const handleUpvote = async (issue) => {
    //not logged in
    if (!user) {
      navigate("/signin");
      return;
    }
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
  return (
    <div className="container mx-auto px-3 md:px-5 lg:px-0">
      {/* Top Heading */}
      <div className="text-center space-y-3 py-6 mt-12">
        <Heading
          className={"text-4xl md:text-5xl pb-2"}
          label={"Issue Details & Tracking"}
        />

        <p className="text-secondary text-lg md:text-xl max-w-2xl mx-auto">
          Explore the complete journey of this issue, track its status, see the
          reporter and staff info, and interact with it in real-time.
        </p>
      </div>
      <div className="md:py-12 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* LEFT SIDE - IMAGE */}
          <div>
            <div className="rounded-3xl overflow-hidden lg:shadow-md">
              <img
                src={issue?.photoURL}
                alt={issue?.title}
                className="rounded-3xl w-full lg:h-84 md:h-72 object-cover hover:scale-105 transition-transform duration-300"
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
                      <span>Upvote {issue?.upvoteCount || ""}</span>
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
      <div className="container mx-auto px-3 md:px-5 lg:px-0 mt-12 text-center">
        <div className="space-y-6">
          {/* Main Heading */}
          <div className="flex items-center justify-center gap-3">
            <FaTasks className="text-gradient w-8 h-8" />
            <Heading
              className={"text-3xl md:text-4xl"}
              label={"Issue Tracking"}
            />
          </div>
          <p className="text-gray-600">
            Monitor the progress and status changes of the issue. Each step is
            visualized with icons, colors, and animations for clarity.
          </p>

          <div>
            <StatusCard />
          </div>
        </div>
      </div>
      {/* Timeline */}
      <div className="container mx-auto px-3 md:px-5 lg:px-0 my-16">
        {/* Timeline Info Heading */}
        <div className="mb-6 text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-secondary mb-3">
            Issue Progress Timeline
          </h3>
          <p className="text-gray-600 text-sm md:text-base">
            This timeline shows the complete lifecycle of the issue, from
            creation to closure. Each step indicates the status changes and key
            actions taken.
          </p>
        </div>
        <div className="text-center">
          <VerticalTimeline issue={issue} />
        </div>
      </div>
    </div>
  );
};

export default IssueDetailsCard;
