import { useForm } from "react-hook-form";
import imageUpload from "../../utilities/imageUpload";
import useAxiosSecure from "../../hooks/auth & role/useAxiosSecure";
import Swal from "sweetalert2";

const AddStuffModal = ({ staffModalRef, staffRefetch }) => {
  const axiosSecure = useAxiosSecure();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const handleAddStuff = async (data) => {
    try {
      //store the image and get the link
      const uploadedPhoto = data.photo[0];
      const photoURL = await imageUpload(uploadedPhoto);

      //creating staff object
      const staffInfo = {
        name: data.name,
        photoURL,
        password: data.password,
        email: data.email,
      };
      //send data to backend
      const res = await axiosSecure.post("/staff", staffInfo);
      staffRefetch();
      staffModalRef.current.close();
      if (res.data.insertedId) {
        await Swal.fire({
          position: "center",
          icon: "success",
          title: "New Staff has been created",
          showConfirmButton: false,
          timer: 2500,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <dialog ref={staffModalRef} className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        <form
          autoComplete="off"
          className="space-y-6 text-ghost md:p-6 p-1"
          onSubmit={handleSubmit(handleAddStuff)}
        >
          {/* Staff Name */}
          <div className="relative">
            <label className="block text-secondary mb-1">Staff Name *</label>
            <input
              type="text"
              {...register("name", {
                required: "Name is required",
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
            <label className="block text-secondary mb-1">Staff Photo *</label>
            <input
              type="file"
              {...register("photo", {
                required: "Photo is required",
              })}
              className="file-input w-full rounded-xl bg-gray-100"
              placeholder="Your Photo"
            />{" "}
            {errors.photo && (
              <p className="text-red-500">{errors.photo.message}</p>
            )}
          </div>

          {/* Email */}
          <div className="relative">
            <label className="block text-secondary mb-1">Staff Email *</label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Please give a valid email",
                },
              })}
              placeholder="example@email.com"
              className="w-full py-2 px-3 bg-gray-100 border border-gray-300 rounded-xl focus:ring-secondary focus:border-secondary focus:outline-none focus:ring-1"
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div className="relative">
            <label className="block text-secondary mb-1">
              Staff Password *
            </label>
            <input
              type="password"
              placeholder="Password"
              {...register("password", {
                required: "Password is required",
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{6,}$/,
                  message:
                    "Password must be 6 chars including uppercase, lowercase, number & symbol",
                },
              })}
              className="w-full py-2 px-3 bg-gray-100 border border-gray-300 rounded-xl focus:ring-secondary focus:border-secondary focus:outline-none focus:ring-1"
            />
            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}
          </div>

          {/* Register button */}
          <button
            className="w-full py-2 bg-primary text-white cursor-pointer rounded-xl font-bold"
            type="submit"
          >
            Create Staff Account
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

export default AddStuffModal;
