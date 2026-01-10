import { useForm } from "react-hook-form";
import Heading from "../../../components/common/heading/Heading";
import SubHeading from "../../../components/common/heading/SubHeading";
import issueCategories from "../../../data/issueCategories";
import imageUpload from "../../../utilities/imageUpload";
import useAuth from "../../../hooks/auth & role/useAuth";
import Swal from "sweetalert2";
import useMyInfo from "../../../hooks/citizen related/useMyInfo";
import useReportIssues from "../../../hooks/citizen related/useReportIssues";
import { useNavigate } from "react-router";
import { Send } from "lucide-react";

const ReportIssues = () => {
  // dependencies
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { myInfo } = useMyInfo();
  const { mutateAsync: reportIssues } = useReportIssues();

  // handle submit & user type logic inside one function
  const handleReportIssues = async (data) => {
    // Blocked user check
    if (myInfo?.isBlocked) {
      return Swal.fire({
        icon: "error",
        title: "Account Blocked",
        text: "Your account is blocked. You cannot submit issues.",
      });
    }

    // Free user limit check
    if (!myInfo?.isPremium && (myInfo?.countIssues ?? 0) >= 3) {
      return Swal.fire({
        title: "Free Limit Up",
        text: "You won't be able to post this! To post again you need to subscribe",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#10b981",
        cancelButtonColor: "#ef4444",
        confirmButtonText: "Yes, Subscribe",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/dashboard/my-profile");
        }
      });
    }

    try {
      // show loading Swal
      Swal.fire({
        title: "Submitting Issue...",
        text: "Uploading image and processing...",
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading(),
      });

      const uploadedPhoto = data?.photo[0];
      const photoURL = await imageUpload(uploadedPhoto);

      const { photo, ...rest } = data;
      const issuesData = { ...rest, photoURL, userEmail: user?.email };

      // send issues to backend
      const res = await reportIssues(issuesData);
      const insertedId = res?.issue?.insertedId;

      if (!insertedId)
        throw new Error("Issues cannot be submitted at the moment");

      Swal.close();

      // success popup
      await Swal.fire({
        position: "center",
        icon: "success",
        title: "Your issue has been submitted",
        showConfirmButton: false,
        timer: 1500,
      });

      navigate("/dashboard/my-reported-issues");
    } catch (error) {
      Swal.close();
      Swal.fire({
        title: "Something went wrong",
        text: error?.response?.data?.message || "Server error!",
        icon: "error",
      });
    }
  };

  return (
    <div className="lg:px-5 px-3 py-6 bg-white max-w-[95%] mx-auto rounded-3xl">
      <div>
        {/* Title Section */}
        <div className="space-y-2">
          <Heading
            label={"Report a Public Infrastructure Issue"}
            className={"text-4xl md:text-5xl pb-1"}
          />
          <SubHeading
            label={
              "Help us keep the city safe and efficient by reporting issues quickly."
            }
          />
        </div>

        {/* Form Section */}
        <form
          autoComplete="off"
          className="space-y-10 text-ghost mb-6 mt-12"
          onSubmit={handleSubmit(handleReportIssues)}
        >
          <div className="space-y-4">
            <h3 className="text-xl font-semibold flex items-center gap-2 text-secondary">
              Issue Details
            </h3>

            {/* Title */}
            <div className="relative">
              <label className="block text-secondary mb-1">Title *</label>
              <input
                type="text"
                {...register("title", { required: "Title is required" })}
                placeholder="Enter a brief title for the issue"
                className="w-full py-2 px-3 bg-base-200 border border-gray-300 rounded-xl focus:ring-1 focus:ring-secondary outline-none"
              />
              {errors.title && (
                <p className="text-red-500">{errors.title.message}</p>
              )}
            </div>

            {/* Description */}
            <div className="relative">
              <label className="block text-secondary mb-1">Description *</label>
              <textarea
                {...register("description", {
                  required: "Description is required",
                })}
                placeholder="Provide a detailed description of the issue"
                className="w-full p-3 bg-base-200 border border-gray-300 rounded-xl focus:ring-1 focus:ring-secondary outline-none"
              ></textarea>
              {errors.description && (
                <p className="text-red-500">{errors.description.message}</p>
              )}
            </div>

            {/* Category */}
            <div className="relative">
              <label className="block text-secondary mb-1">Category *</label>
              <select
                {...register("category", { required: "Category is required" })}
                className="w-full py-2 px-3 bg-base-200 border border-gray-300 rounded-xl focus:ring-1 focus:ring-secondary outline-none"
              >
                <option value="">Select Category</option>
                {issueCategories.map((cat, i) => (
                  <option key={i} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p className="text-red-500">{errors.category.message}</p>
              )}
            </div>

            {/* Upload Images */}
            <div className="relative">
              <label className="block text-secondary mb-1">Upload Image</label>
              <input
                type="file"
                {...register("photo", { required: "Photo is required" })}
                className="w-full file-input bg-base-200 rounded-xl outline-none"
              />
              {errors.photo && (
                <p className="text-red-500">{errors.photo.message}</p>
              )}
            </div>

            {/* Location */}
            <div className="relative">
              <label className="block text-secondary mb-1">Location *</label>
              <input
                type="text"
                {...register("location", { required: "Location is required" })}
                placeholder="Enter the issue location"
                className="w-full py-2 px-3 bg-base-200 border border-gray-300 rounded-xl focus:ring-1 focus:ring-secondary outline-none"
              />
              {errors.location && (
                <p className="text-red-500">{errors.location.message}</p>
              )}
            </div>
          </div>

          {/* Single Submit Button */}
          <div className="space-y-2">
            <p className="text-sm text-secondary">
              Free users can report up to 3 issues. Upgrade to premium for
              unlimited reports.
              {!myInfo?.isPremium && (
                <> — Free Issue Left: {3 - (myInfo?.countIssues || 0)}</>
              )}
            </p>
            <button
              type="submit"
              className="px-10 py-3 rounded-3xl font-extrabold bg-primary text-white cursor-pointer hover:bg-secondary transition-colors duration-300 flex justify-center items-center gap-2"
            >
              <Send className="w-4 h-4" /> <span>Submit Issue</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReportIssues;
