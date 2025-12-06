import useAuth from "../../../hooks/auth & role/useAuth";
import useMyInfo from "../../../hooks/citizen related/useMyInfo";
import profilePageCover from "../../../assets/profilePageCover.jpg";
import useAxiosSecure from "../../../hooks/auth & role/useAxiosSecure";
import toast from "react-hot-toast";

const Profile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  //my info
  const { myInfo } = useMyInfo();
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
  return (
    <div className="flex justify-center items-center h-screen">
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
          <p
            className={`badge badge-lg ${
              myInfo?.isPremium ? "badge-success" : "badge-ghost"
            } font-semibold text-secondary absolute top-10 right-80`}
          >
            {myInfo?.isPremium ? "Premium" : "Normal"}
          </p>

          <p className="p-2 px-4 text-xs text-primary font-extrabold uppercase">
            {myInfo?.role}
          </p>
          <p className="text-xl font-medium text-gray-800 ">
            {user?.displayName}
          </p>
          <div className="w-full rounded-lg">
            <div className="flex flex-wrap items-center justify-between text-sm text-gray-600 ">
              <div>
                <p>
                  Name :{" "}
                  <span className="font-bold text-gray-600 ">
                    {user?.displayName}
                  </span>
                </p>
                <p>
                  Email :{" "}
                  <span className="font-bold text-gray-600 ">
                    {user?.email}
                  </span>
                </p>
              </div>
              <div className="flex flex-col gap-1">
                {myInfo?.isBlocked ? (
                  <div className="btn btn-warning text-secondary rounded-lg cursor-default">
                    Blocked
                  </div>
                ) : (
                  <>
                    {myInfo?.isPremium ? (
                      <div className="btn btn-primary text-white rounded-lg cursor-default">
                        Subscribed
                      </div>
                    ) : (
                      <button
                        onClick={handleSubscription}
                        className="btn btn-primary rounded-lg text-white cursor-pointer"
                      >
                        Subscribe
                      </button>
                    )}

                    <button className="btn btn-ghost rounded-lg text-secondary cursor-pointer border border-primary">
                      Update Profile
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
