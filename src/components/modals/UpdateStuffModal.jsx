import { useEffect } from "react";
import { useForm } from "react-hook-form";

const UpdateStuffModal = ({
  staffUpdateModalRef,
  staffRefetch,
  currentStaff,
}) => {
  console.log(currentStaff);
  //dependencies
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      staffName: currentStaff?.staffName,
      staffEmail: currentStaff?.staffEmail,
      staffPhotoURL: currentStaff?.staffPhotoURL,
      staffPhone: currentStaff?.staffPhone,
    },
  });

  const handleUpdateStuff = (data) => {
    console.log(data);
  };
  return (
    <dialog
      ref={staffUpdateModalRef}
      className="modal modal-bottom sm:modal-middle"
    >
      <div className="modal-box">
        <form
          autoComplete="off"
          className="space-y-6 text-ghost md:p-6 p-1"
          onSubmit={handleSubmit(handleUpdateStuff)}
        >
          {/* Staff Name */}
          <div className="relative">
            <label className="block text-secondary mb-1">Staff Name *</label>
            <input
              type="text"
              defaultValue={currentStaff?.staffName}
              {...register("staffName", {
                required: "Staff Name is required",
              })}
              placeholder="Your full name"
              className="w-full py-2 px-3 bg-gray-100 border border-gray-300 rounded-xl focus:ring-secondary focus:border-secondary focus:outline-none focus:ring-1"
            />
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
          </div>

          {/* Staff Photo image field */}
          <div className="relative">
            <div className="flex justify-between items-end">
              <label className="block text-secondary mb-1">Staff Photo</label>
              <img
                src={currentStaff?.staffPhotoURL}
                alt=""
                className="w-16 h-16"
              />
            </div>
            <input
              type="file"
              {...register("staffPhotoURL")}
              className="file-input w-full rounded-xl bg-gray-100"
              placeholder="Staff Photo"
            />{" "}
          </div>

          {/* Email */}
          <div className="relative">
            <label className="block text-secondary mb-1">Staff Email *</label>
            <input
              defaultValue={currentStaff?.staffEmail}
              type="email"
              {...register("staffEmail", {
                required: "Staff Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Please give a valid email",
                },
              })}
              placeholder="example@email.com"
              className="w-full py-2 px-3 bg-gray-100 border border-gray-300 rounded-xl focus:ring-secondary focus:border-secondary focus:outline-none focus:ring-1"
            />
            {errors.staffEmail && (
              <p className="text-red-500">{errors.staffEmail.message}</p>
            )}
          </div>

          {/* Phone */}
          <div className="relative">
            <label className="block text-secondary mb-1">Staff Phone *</label>
            <input
              type="tel"
              defaultValue={currentStaff?.staffPhone}
              {...register("staffPhone", {
                required: "Staff Phone is required",
                pattern: {
                  value: /^\+8801[3-9]\d{8}$/,
                  message: "Please give a valid phone number (+8801XXXXXXXXX)",
                },
              })}
              placeholder="+8801XXXXXXXXX"
              className="w-full py-2 px-3 bg-gray-100 border border-gray-300 rounded-xl focus:ring-secondary focus:border-secondary focus:outline-none focus:ring-1"
            />
            {errors.staffPhone && (
              <p className="text-red-500">{errors.staffPhone.message}</p>
            )}
          </div>

          {/* Register button */}
          <button
            className="w-full py-2 bg-primary text-white cursor-pointer rounded-xl font-bold"
            type="submit"
          >
            Update Staff Account
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
  );
};

export default UpdateStuffModal;
