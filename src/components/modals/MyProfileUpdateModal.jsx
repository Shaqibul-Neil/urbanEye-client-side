import { useForm } from "react-hook-form";
import useAuth from "../../hooks/auth & role/useAuth";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import imageUpload from "../../utilities/imageUpload";
import useAxiosSecure from "../../hooks/auth & role/useAxiosSecure";
import useRole from "../../hooks/auth & role/useRole";
import { useState } from "react";

const MyProfileUpdateModal = ({ profileUpdateRef }) => {
  const [loading, setLoading] = useState(false);
  const { user, updateUser } = useAuth();
  const { role } = useRole();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: user?.displayName,
      photo: user?.photoURL,
    },
  });

  const axiosSecure = useAxiosSecure();
  const handleUpdateProfile = async (data) => {
    try {
      setLoading(true);
      let photoURL = user?.photoURL;
      //do not use ternary here. sometimes user wont upload photo thats why we need error here so that pervious photo persists
      if (data?.photo && data?.photo[0]) {
        try {
          photoURL = await imageUpload(data.photo[0]);
        } catch (err) {
          console.log(err);
          toast.error("Image upload failed, using previous photo:", err);
          photoURL = user?.photoURL;
        }
      } else {
        photoURL = user?.photoURL;
      }

      //firebase update
      const userProfile = {
        displayName: data?.name || user?.displayName,
        photoURL: photoURL || user?.photoURL,
      };
      await updateUser(userProfile);
      // database update
      const profileData = {
        name: data?.name || user?.displayName,
        photoURL: photoURL || user?.photoURL,
        role,
      };

      const res = await axiosSecure.patch("users/my-profile", profileData);
      profileUpdateRef.current.close();
      console.log(res);
      if (res?.data?.profile?.modifiedCount) {
        await Swal.fire({
          position: "center",
          icon: "success",
          title: "Your Profile has been updated",
          showConfirmButton: false,
          timer: 2500,
        });
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <dialog
      ref={profileUpdateRef}
      className="modal modal-bottom sm:modal-middle"
    >
      <div className="modal-box">
        <form
          autoComplete="off"
          className="space-y-6 text-ghost md:p-6 p-1"
          onSubmit={handleSubmit(handleUpdateProfile)}
        >
          <div className="border border-primary w-16 h-16">
            <img
              src={user?.photoURL}
              alt={user?.displayName}
              className="w-16 h-16"
            />
          </div>
          {/* My Name */}
          <div className="relative">
            <label className="block text-secondary mb-1">Update Name</label>
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

          {/* My Photo image */}
          <div className="relative">
            <label className="block text-secondary mb-1">Update Photo</label>
            <input
              type="file"
              {...register("photo")}
              className="file-input w-full rounded-xl bg-gray-100"
              placeholder="Your Photo"
            />{" "}
          </div>

          {/* Register button */}
          <button
            className={`w-full py-2 bg-primary text-white cursor-pointer rounded-xl font-bold ${
              loading ? "bg-gray-400 cursor-not-allowed" : "bg-primary"
            }`}
            disabled={loading}
            type="submit"
          >
            {loading ? "Updating..." : "Update My Information"}
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

export default MyProfileUpdateModal;
