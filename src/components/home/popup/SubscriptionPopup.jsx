import { motion, AnimatePresence } from "framer-motion";
import Lottie from "lottie-react";
import popup from "../../../lottie/popup.json";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const SubscriptionPopup = ({ isOpen, onClose }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    Swal.fire({
      icon: "success",
      title: "Subscribed!",
      text: `Thank you for subscribing with ${data?.email}`,
      showConfirmButton: true,
      confirmButtonText: "Close",
    });

    reset(); // form reset
    onClose(); // popup close
  };
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Popup */}
          <motion.div
            className="fixed top-1/2 left-1/2 z-50 md:w-1/2 w-11/12 bg-white rounded-xl p-6 flex flex-col items-center gap-4 -translate-x-1/2 -translate-y-1/2"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <button
              onClick={onClose}
              className="cursor-pointer absolute top-2 right-2 text-gray-500 hover:text-gray-800"
            >
              ✕
            </button>

            <Lottie
              animationData={popup}
              loop
              className="w-64 h-64 lg:w-80 lg:h-80"
            />
            <div>
              <h2 className="text-2xl font-bold text-center text-primary">
                Subscribe!
              </h2>
              <p className="text-center text-gray-600">
                Get notified about new updates.
              </p>
            </div>

            <form
              className="w-full flex flex-col gap-2"
              onSubmit={handleSubmit(onSubmit)}
            >
              <input
                type="email"
                placeholder="Enter your email"
                className="border border-gray-300 rounded-lg p-2 w-full"
                {...register("email")}
              />
              {errors.email && (
                <span className="text-red-500 text-sm">
                  Please enter a valid email
                </span>
              )}

              <button
                type="submit"
                className="border-primary border text-primary rounded-lg py-2 px-4 w-full hover:bg-primary cursor-pointer transition-all duration-300 hover:text-white font-semibold"
              >
                Subscribe
              </button>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SubscriptionPopup;
