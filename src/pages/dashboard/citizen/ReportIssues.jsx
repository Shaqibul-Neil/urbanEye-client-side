import { useForm } from "react-hook-form";
import Heading from "../../../components/common/heading/Heading";
import SubHeading from "../../../components/common/heading/SubHeading";
import issueCategories from "../../../data/issueCategories";
import imageUpload from "../../../utilities/imageUpload";
import useAuth from "../../../hooks/auth & role/useAuth";
import Swal from "sweetalert2";
import useMyInfo from "../../../hooks/citizen related/useMyInfo";
import useReportIssues from "../../../hooks/citizen related/useReportIssues";
import { Link, useNavigate } from "react-router";

const ReportIssues = () => {
  //dependencies
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { user } = useAuth();
  const navigate = useNavigate();
  //mutation function
  const { mutateAsync: reportIssues } = useReportIssues();

  //myInfo
  const { myInfo } = useMyInfo();

  //report issue submit
  const handleReportIssues = async (data) => {
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
      //removing photo from data
      const { photo, ...rest } = data;
      const issuesData = { ...rest, photoURL, userEmail: user?.email };
      //send issues to backend
      const res = await reportIssues(issuesData);
      //console.log(res);
      const insertedId = res?.issue?.insertedId;
      if (!insertedId)
        throw new Error("Issues can not be submitted at the moment");
      // close loading Swal
      Swal.close();
      //success popup
      await Swal.fire({
        position: "center",
        icon: "success",
        title: "Your issues has been submitted",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/dashboard/my-reported-issues");
    } catch (error) {
      Swal.close();
      //console.log(error);
      // error popup
      Swal.fire({
        title: "Something went wrong",
        text: error?.response?.data?.message || "Server error!",
        icon: "error",
      });
    }
  };
  return (
    <div className="px-5">
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
          {/* Issue Details */}
          <div className="bg-white p-6 rounded-4xl space-y-4">
            <h3 className="text-xl font-semibold flex items-center gap-2 text-secondary">
              Issue Details
            </h3>

            {/* Issue Title */}
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

          {/* Submit */}
          <div className="space-y-2">
            <p className="text-sm text-secondary">
              Free users can report up to 3 issues. Upgrade to premium for
              unlimited reports.
              {!myInfo?.isPremium && (
                <> — Free Issue Left: {3 - (myInfo?.countIssues || 0)}</>
              )}
            </p>

            {/* Submit Button Logic */}
            {myInfo?.isBlocked ? (
              <button
                type="submit"
                className="px-10 py-3 rounded-xl font-extrabold bg-gray-400 cursor-not-allowed"
                disabled
                title="Your account is blocked. You cannot submit issues."
              >
                Submit Issue
              </button>
            ) : myInfo?.isPremium || (myInfo?.countIssues ?? 0) < 3 ? (
              <button
                type="submit"
                className="px-10 py-3 rounded-xl font-extrabold bg-primary text-white cursor-pointer"
              >
                Submit Issue
              </button>
            ) : null}
          </div>
        </form>
        {/* Subscribe Link for free users who reached limit */}
        {!myInfo?.isPremium && (myInfo?.countIssues ?? 0) >= 3 && (
          <Link
            to={"/dashboard/my-profile"}
            className="px-10 py-3 bg-primary text-white font-extrabold rounded-xl cursor-pointer"
          >
            Subscribe to Report
          </Link>
        )}
      </div>
    </div>
  );
};

export default ReportIssues;
