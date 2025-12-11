import { useEffect } from "react";
import { useForm } from "react-hook-form";
import imageUpload from "../../utilities/imageUpload";
import useStaffUpdate from "../../hooks/admin related/useStaffUpdate";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

const UpdateStuffModal = ({
  staffUpdateModalRef,
  staffRefetch,
  currentStaff,
}) => {
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
      staffPhone: currentStaff?.staffPhone,
    },
  });
  useEffect(() => {
    if (currentStaff) {
      reset({
        staffName: currentStaff?.staffName,
        staffEmail: currentStaff?.staffEmail,
        staffPhone: currentStaff?.staffPhone,
      });
    }
  }, [currentStaff, reset]);
  //staff update mutation
  const { mutateAsync: staffUpdate } = useStaffUpdate();
  const handleUpdateStuff = async (data) => {
    try {
      const staffData = {
        staffName: data.staffName,
        staffEmail: data.staffEmail,
        staffPhone: data.staffPhone,
        staffId: currentStaff._id,
      };
      const res = await staffUpdate(staffData);
      staffUpdateModalRef.current.close();
      if (res?.staff?.modifiedCount) {
        await Swal.fire({
          position: "center",
          icon: "success",
          title: "Staff Information has been updated",
          showConfirmButton: false,
          timer: 2500,
        });
      }
    } catch (error) {
      toast.error(error.message);
    }
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
              {...register("staffName", {
                required: "Staff Name is required",
              })}
              placeholder="Your full name"
              className="w-full py-2 px-3 bg-gray-100 border border-gray-300 rounded-xl focus:ring-secondary focus:border-secondary focus:outline-none focus:ring-1"
            />
            {errors.staffName && (
              <p className="text-red-500">{errors.staffName.message}</p>
            )}
          </div>

          {/* Email */}
          <div className="relative">
            <label className="block text-secondary mb-1">Staff Email *</label>
            <input
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
