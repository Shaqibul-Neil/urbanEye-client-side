import useAuth from "../../../hooks/auth & role/useAuth";
import useMyInfo from "../../../hooks/citizen related/useMyInfo";
import profilePageCover from "../../../assets/profilePageCover.jpg";
import useAxiosSecure from "../../../hooks/auth & role/useAxiosSecure";
import toast from "react-hot-toast";
import { useRef } from "react";
import MyProfileUpdateModal from "../../../components/modals/MyProfileUpdateModal";
import Loading from "../../../components/loading/Loading";
import ErrorComponent from "../../../components/error/error page/ErrorComponent";
import { Link } from "react-router";

const Profile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const profileUpdateRef = useRef();

  // my info
  const { myInfo, isLoading, isError } = useMyInfo();

  const handleSubscription = async () => {
    try {
      const paymentInfo = {
        paymentName: "Subscription Payment",
        userEmail: user?.email,
      };
      const result = await axiosSecure.post(
        "/payments/create-checkout-session",
        paymentInfo
      );
      // redirect to checkout page
      window.location.assign(result?.data?.url);
    } catch (error) {
      toast.error(error.message || "Something went wrong!");
    }
  };

  const handleUpdateModal = () => {
    profileUpdateRef.current.showModal();
  };

  if (isLoading) return <Loading />;
  if (isError) return <ErrorComponent />;

  return (
    <div className="flex justify-center items-start min-h-screen px-3 py-10 bg-base-200">
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-5xl overflow-visible relative">
        {/* Cover Image */}
        <img
          alt="cover photo"
          src={profilePageCover}
          className="w-full mb-4 rounded-t-2xl h-56 object-cover"
        />

        {/* Profile Image */}
        <div className="flex flex-col items-center -mt-28 relative">
          <img
            alt="profile"
            src={user?.photoURL}
            className="mx-auto object-cover rounded-full h-40 w-40 border-4 border-white"
          />

          {/* Role & Name */}
          <p className="p-2 px-4 text-xs text-primary font-extrabold uppercase">
            {myInfo?.role}
          </p>
          <p className="text-xl font-medium text-gray-800 mb-4">
            {user?.displayName}
          </p>

          {/* Info & Actions */}
          <div className="w-full px-6 pb-8 flex flex-col md:flex-row justify-between items-center gap-4">
            {/* User Info */}
            <div className="flex flex-col items-center md:items-start gap-2 text-sm text-gray-600">
              <p>
                {/* Premium / Normal Badge */}
                {myInfo?.role === "citizen" && (
                  <span
                    className={`badge badge-lg ${
                      myInfo?.isPremium ? "badge-success" : "badge-ghost"
                    }`}
                  >
                    {myInfo?.isPremium ? "Premium" : "Normal"} User
                  </span>
                )}
              </p>
              <p>
                Name:{" "}
                <span className="font-bold text-gray-600">
                  {user?.displayName}
                </span>
              </p>
              <p>
                Email:{" "}
                <span className="font-bold text-gray-600">{user?.email}</span>
              </p>
            </div>

            {/* Actions */}
            <div className="flex md:flex-row flex-col gap-3 w-full md:w-auto">
              {/* Download PDF Button */}
              {myInfo?.role === "citizen" && (
                <Link
                  to="/dashboard/invoice-payment-history"
                  className="btn btn-outline btn-primary w-full md:w-auto text-center rounded-lg"
                >
                  Payment Invoice
                </Link>
              )}

              {/* Blocked */}
              {myInfo?.role !== "admin" && myInfo?.isBlocked ? (
                <div className="btn btn-warning text-secondary rounded-lg cursor-default w-full md:w-auto text-center">
                  Blocked
                </div>
              ) : (
                <>
                  {/* Subscribe */}
                  {myInfo?.role === "citizen" && !myInfo?.isPremium && (
                    <button
                      onClick={handleSubscription}
                      className="btn btn-primary rounded-lg text-white w-full md:w-auto"
                    >
                      Subscribe
                    </button>
                  )}

                  {/* Subscribed Badge */}
                  {myInfo?.role === "citizen" && myInfo?.isPremium && (
                    <div className="btn btn-primary text-white rounded-lg cursor-default w-full md:w-auto text-center">
                      Subscribed
                    </div>
                  )}

                  {/* Update Profile */}
                  <button
                    className="btn btn-ghost rounded-lg text-secondary cursor-pointer border-2 border-primary w-full md:w-auto"
                    onClick={handleUpdateModal}
                  >
                    Update Profile
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Profile Update Modal */}
      <MyProfileUpdateModal profileUpdateRef={profileUpdateRef} />
    </div>
  );
};

export default Profile;
