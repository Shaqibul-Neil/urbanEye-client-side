import { useForm } from "react-hook-form";
import issueCategories from "../../data/issueCategories";
import { useEffect } from "react";
import useUpdateIssue from "../../hooks/citizen related/useUpdateIssue";
import imageUpload from "../../utilities/imageUpload";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

const EditIssueModal = ({ editIssueRef, currentIssue }) => {
  //dependencies
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      title: currentIssue?.title,
      description: currentIssue?.description,
      category: currentIssue?.category,
      location: currentIssue?.location,
    },
  });
  // When the modal opens with a selected issue, react-hook-form won't automatically update defaultValues because the form is already mounted. This effect manually resets the form each time currentIssue changes, ensuring all fields (including the category select box) are prefilled correctly.
  useEffect(() => {
    if (currentIssue) {
      reset({
        title: currentIssue?.title,
        description: currentIssue?.description,
        category: currentIssue?.category,
        location: currentIssue?.location,
      });
    }
  }, [currentIssue, reset]);

  //patch mutation function
  const { mutateAsync: updateIssue } = useUpdateIssue();
  const handleEditIssues = async (data) => {
    try {
      let photoURL = currentIssue.photoURL;
      if (data.photo && data.photo[0]) {
        photoURL = await imageUpload(data.photo[0]);
      }
      const issueData = {
        title: data.title,
        description: data.description,
        category: data.category,
        location: data.location,
        photoURL,
        issueId: currentIssue._id,
      };
      const res = await updateIssue(issueData);
      editIssueRef.current.close();
      if (res?.issue?.modifiedCount) {
        await Swal.fire({
          position: "center",
          icon: "success",
          title: "Issue has been updated",
          showConfirmButton: false,
          timer: 2500,
        });
      }
    } catch (error) {
      toast.error(error?.message);
    }
  };
  return (
    <>
      <dialog ref={editIssueRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <form
            autoComplete="off"
            className="space-y-10 text-ghost md:p-6 p-1"
            onSubmit={handleSubmit(handleEditIssues)}
          >
            {/* Issue Details */}
            <div className="bg-white rounded-4xl space-y-4">
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
                <label className="block text-secondary mb-1">
                  Description *
                </label>
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
                  {...register("category", {
                    required: "Category is required",
                  })}
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
                <div className="flex justify-between items-end">
                  <label className="block text-secondary mb-1">
                    Upload New Image
                  </label>
                  <img
                    src={currentIssue?.photoURL}
                    alt=""
                    className="w-16 h-16"
                  />
                </div>
                <input
                  type="file"
                  {...register("photo")}
                  className="w-full file-input bg-base-200 rounded-xl outline-none"
                />
              </div>

              {/* Location */}
              <div className="relative">
                <label className="block text-secondary mb-1">Location *</label>
                <input
                  type="text"
                  {...register("location", {
                    required: "Location is required",
                  })}
                  placeholder="Enter the issue location"
                  className="w-full py-2 px-3 bg-base-200 border border-gray-300 rounded-xl focus:ring-1 focus:ring-secondary outline-none"
                />
                {errors.location && (
                  <p className="text-red-500">{errors.location.message}</p>
                )}
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="px-10 py-3 bg-primary text-white font-extrabold rounded-xl cursor-pointer"
            >
              Update Issue
            </button>
          </form>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default EditIssueModal;
