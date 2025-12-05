import { useForm } from "react-hook-form";
import issueCategories from "../../data/issueCategories";

const EditIssueModal = ({ editIssueRef, currentIssue }) => {
  const { title, description, category, photoURL, location } = currentIssue;
  //dependencies
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title,
      description,
      category,
      location,
    },
  });
  const handleEditIssues = () => {};
  return (
    <>
      <dialog ref={editIssueRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <form
            autoComplete="off"
            className="space-y-10 text-ghost"
            onSubmit={handleSubmit(handleEditIssues)}
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
                <label className="block text-secondary mb-1">
                  Upload Image
                </label>
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
              Submit Issue
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
