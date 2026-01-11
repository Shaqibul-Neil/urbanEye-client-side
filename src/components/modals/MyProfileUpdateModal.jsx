import { useForm } from "react-hook-form";
import useAuth from "../../hooks/auth & role/useAuth";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import imageUpload from "../../utilities/imageUpload";
import useAxiosSecure from "../../hooks/auth & role/useAxiosSecure";
import useRole from "../../hooks/auth & role/useRole";
import { useState } from "react";
import Loading from "../loading/Loading";
import { motion } from "framer-motion";

const MyProfileUpdateModal = ({ profileUpdateRef, isOpen, onClose }) => {
  const [loading, setLoading] = useState(false);
  const { user, updateUser, setUser } = useAuth();
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
    let photoURL;
    try {
      setLoading(true);
      if (data.photo[0].name) {
        photoURL = await imageUpload(data?.photo[0]);
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
        name: data?.name,
        photoURL: photoURL,
        role,
      };

      const res = await axiosSecure.put("users/my-profile", profileData);

      if (res?.data?.profile?.modifiedCount) {
        setLoading(false);
        await Swal.fire({
          position: "center",
          icon: "success",
          title: "Your Profile has been updated",
          showConfirmButton: false,
          timer: 2500,
        });
        setUser({ ...user, displayName: data.name, photoURL: photoURL });
      }
    } catch (error) {
      toast.error(error?.message || "Something went wrong");
    } finally {
      setLoading(false);
      profileUpdateRef.current.close();
    }
  };
  if (loading) return <Loading />;
  return (
    <dialog
      ref={profileUpdateRef}
      className="modal modal-bottom sm:modal-middle"
    >
      <motion.div
        className="modal-box"
        initial={{ y: 100, opacity: 0 }}
        animate={isOpen ? { y: 0, opacity: 1 } : { y: 100, opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
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
          <motion.div
            className="relative"
            initial={{ opacity: 0, y: 20 }}
            animate={isOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
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
          </motion.div>

          {/* My Photo image */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, y: 20 }}
            animate={isOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <label className="block text-secondary mb-1">Update Photo</label>
            <input
              type="file"
              {...register("photo")}
              className="file-input w-full rounded-xl bg-gray-100"
              placeholder="Your Photo"
            />{" "}
          </motion.div>

          {/* Register button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <button
              className={`w-full py-2 bg-primary text-white cursor-pointer rounded-xl font-bold hover:bg-secondary transition-all duration-500 ${
                loading ? "bg-gray-400 cursor-not-allowed" : "bg-primary"
              }`}
              disabled={loading}
              type="submit"
            >
              {loading ? "Updating..." : "Update My Information"}
            </button>
          </motion.div>
        </form>
        <div className="modal-action">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn" onClick={onClose}>
              Close
            </button>
          </form>
        </div>
      </motion.div>
    </dialog>
  );
};

export default MyProfileUpdateModal;
