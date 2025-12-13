import useAuth from "../../../hooks/auth & role/useAuth";
import useMyInfo from "../../../hooks/citizen related/useMyInfo";
import profilePageCover from "../../../assets/profilePageCover.jpg";
import useAxiosSecure from "../../../hooks/auth & role/useAxiosSecure";
import toast from "react-hot-toast";
import { useRef } from "react";
import MyProfileUpdateModal from "../../../components/modals/MyProfileUpdateModal";

const Profile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const profileUpdateRef = useRef();
  //my info
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
      //redirect to checkout page
      window.location.assign(result?.data?.url);
    } catch (error) {
      toast.error(error.message || "Something went wrong!");
    }
  };
  const handleUpdateModal = () => {
    profileUpdateRef.current.showModal();
  };
  if (isLoading) return <p>Loading profile...</p>;
  if (isError) return <p>No profile data found!</p>;
  return (
    <div className="flex justify-center items-center h-screen px-3">
      <div className="bg-white shadow-lg rounded-2xl md:w-4/5">
        <img
          alt="cover photo"
          src={profilePageCover}
          className="w-full mb-4 rounded-t-lg h-56"
        />
        <div className="flex flex-col items-center justify-center p-4 -mt-28 relative">
          <div>
            <img
              alt="profile"
              src={user?.photoURL}
              className="mx-auto object-cover rounded-full h-40 w-40 border-2 border-white "
            />
          </div>
          {myInfo?.role === "citizen" && (
            <p
              className={`badge badge-lg ${
                myInfo?.isPremium ? "badge-success" : "badge-ghost"
              } font-semibold text-secondary absolute top-10 right-80`}
            >
              {myInfo?.isPremium ? "Premium" : "Normal"}
            </p>
          )}

          <p className="p-2 px-4 text-xs text-primary font-extrabold uppercase">
            {myInfo?.role}
          </p>
          <p className="text-xl font-medium text-gray-800 mb-4">
            {user?.displayName}
          </p>
          <div className="w-full">
            <div className="flex flex-col gap-4 text-sm text-gray-600 mx-auto md:flex-row md:justify-between md:items-center">
              <div>
                <p className="text-center md:text-left">
                  Name :{" "}
                  <span className="font-bold text-gray-600">
                    {user?.displayName}
                  </span>
                </p>
                <p className="text-center md:text-left">
                  Email :{" "}
                  <span className="font-bold text-gray-600 ">
                    {user?.email}
                  </span>
                </p>
              </div>
              <div className="flex flex-col gap-1">
                {myInfo?.role !== "admin" && myInfo?.isBlocked ? (
                  <div className="btn btn-warning text-secondary rounded-lg cursor-default">
                    Blocked
                  </div>
                ) : (
                  <>
                    {/* Subscribe Button */}
                    {myInfo?.role === "citizen" && !myInfo?.isPremium && (
                      <button
                        onClick={handleSubscription}
                        className="btn btn-primary rounded-lg text-white cursor-pointer"
                      >
                        Subscribe
                      </button>
                    )}

                    {/* Subscribed Badge (for premium citizens) */}
                    {myInfo?.role === "citizen" && myInfo?.isPremium && (
                      <div className="btn btn-primary text-white rounded-lg cursor-default">
                        Subscribed
                      </div>
                    )}

                    <button
                      className="btn btn-ghost rounded-lg text-secondary cursor-pointer border-2 border-primary"
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
      </div>
      {/* Modal Section */}
      <MyProfileUpdateModal profileUpdateRef={profileUpdateRef} />
    </div>
  );
};

export default Profile;
