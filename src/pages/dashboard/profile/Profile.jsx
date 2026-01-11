import { motion } from "framer-motion";
import useAuth from "../../../hooks/auth & role/useAuth";
import useMyInfo from "../../../hooks/citizen related/useMyInfo";
import useAxiosSecure from "../../../hooks/auth & role/useAxiosSecure";
import toast from "react-hot-toast";
import { useRef, useState } from "react";
import MyProfileUpdateModal from "../../../components/modals/MyProfileUpdateModal";
import Loading from "../../../components/loading/Loading";
import ErrorComponent from "../../../components/error/error page/ErrorComponent";

// Profile Components
import ProfileIdentityCard from "../../../components/profile/ProfileIdentityCard";
import ProfileActionButtons from "../../../components/profile/ProfileActionButtons";
import CitizenProfileStats from "../../../components/profile/CitizenProfileStats";
import AdminProfileStats from "../../../components/profile/AdminProfileStats";
import StaffProfileStats from "../../../components/profile/StaffProfileStats";
import CivicTipsCards from "../../../components/profile/CivicTipsCards";

const Profile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const profileUpdateRef = useRef();
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

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
    setIsProfileModalOpen(true);
    profileUpdateRef.current.showModal();
  };
  const handleCloseModal = () => {
    setIsProfileModalOpen(false);
    profileUpdateRef.current.close();
  };

  if (isLoading) return <Loading />;
  if (isError) return <ErrorComponent />;

  return (
    <div className="min-h-screen md:px-8 px-3 py-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Profile Header Section - 2 Grid + 1 Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Identity Card - Takes 2 columns */}
          <div className="lg:col-span-2 flex flex-col gap-8">
            <ProfileIdentityCard user={user} myInfo={myInfo} />
            {myInfo?.role === "citizen" && <CivicTipsCards />}
          </div>

          {/* Action Buttons - Takes 1 column */}
          <div className="lg:col-span-1">
            <ProfileActionButtons
              myInfo={myInfo}
              handleSubscription={handleSubscription}
              handleUpdateModal={handleUpdateModal}
            />
          </div>
        </div>

        {/* Role-Specific Analytics Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="bg-white rounded-2xl md:p-8 p-4 shadow-sm border border-gray-100"
        >
          <div className="mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.5 }}
              className="flex items-center gap-4 mb-4"
            >
              <div className="w-1 h-8 bg-gradient-to-b from-primary to-accent rounded-full"></div>
              <div>
                <h2 className="text-3xl font-bold text-gray-800">
                  {myInfo?.role === "citizen" && "Activity & Insights"}
                  {myInfo?.role === "admin" && "Platform Overview"}
                  {myInfo?.role === "staff" && "Performance Dashboard"}
                </h2>
                <p className="text-gray-600 mt-1">
                  {myInfo?.role === "citizen" &&
                    "Track your civic engagement and issue reporting activity"}
                  {myInfo?.role === "admin" &&
                    "Monitor platform health and citizen engagement metrics"}
                  {myInfo?.role === "staff" &&
                    "Review your performance metrics and resolution trends"}
                </p>
              </div>
            </motion.div>
          </div>

          {/* Render Role-Specific Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.6 }}
          >
            {myInfo?.role === "citizen" && (
              <CitizenProfileStats userEmail={user?.email} />
            )}
            {myInfo?.role === "admin" && <AdminProfileStats />}
            {myInfo?.role === "staff" && (
              <StaffProfileStats userEmail={user?.email} />
            )}
          </motion.div>
        </motion.div>
      </div>

      {/* Profile Update Modal */}
      <MyProfileUpdateModal
        profileUpdateRef={profileUpdateRef}
        isOpen={isProfileModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default Profile;
