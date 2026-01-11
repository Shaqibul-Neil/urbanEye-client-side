import { motion } from "framer-motion";
import { Link } from "react-router";
import {
  FaFileInvoice,
  FaCrown,
  FaEdit,
  FaBan,
  FaCheckCircle,
} from "react-icons/fa";

const ProfileActionButtons = ({
  myInfo,
  handleSubscription,
  handleUpdateModal,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7, duration: 0.5 }}
      className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 h-fit"
    >
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
          <span className="w-2 h-2 bg-primary rounded-full"></span>
          Quick Actions
        </h3>
        {/* Status Indicator */}

        <div className="flex items-center gap-2 text-sm">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-gray-600">Online</span>
        </div>
      </div>

      <div className="space-y-4">
        {/* Payment Invoice for Citizens */}
        {myInfo?.role === "citizen" && (
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Link
              to="/dashboard/invoice-payment-history"
              className="flex items-center gap-3 w-full p-4 bg-gradient-to-r from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 rounded-xl border border-blue-200 transition-all duration-300 group"
            >
              <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <FaFileInvoice className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-blue-700">Payment Invoice</p>
                <p className="text-xs text-blue-600">View billing history</p>
              </div>
            </Link>
          </motion.div>
        )}

        {/* Blocked Status */}
        {myInfo?.role !== "admin" && myInfo?.isBlocked ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-3 w-full p-4 bg-gradient-to-r from-red-50 to-red-100 rounded-xl border border-red-200"
          >
            <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center">
              <FaBan className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-red-700">Account Blocked</p>
              <p className="text-xs text-red-600">Contact support</p>
            </div>
          </motion.div>
        ) : (
          <>
            {/* Subscribe Button for Non-Premium Citizens */}
            {myInfo?.role === "citizen" && !myInfo?.isPremium && (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSubscription}
                className="flex items-center gap-3 w-full p-4 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <FaCrown className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 text-left">
                  <p className="font-bold text-white">Upgrade to Premium</p>
                  <p className="text-xs text-yellow-100">Unlock all features</p>
                </div>
              </motion.button>
            )}

            {/* Subscribed Badge for Premium Citizens */}
            {myInfo?.role === "citizen" && myInfo?.isPremium && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-3 w-full p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-xl border border-green-200"
              >
                <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                  <FaCheckCircle className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-green-700">Premium Active</p>
                  <p className="text-xs text-green-600">
                    All features unlocked
                  </p>
                </div>
              </motion.div>
            )}

            {/* Update Profile Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-3 w-full p-4 bg-gradient-to-r from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 rounded-xl border border-gray-200 transition-all duration-300 group cursor-pointer"
              onClick={handleUpdateModal}
            >
              <div className="w-10 h-10 bg-gray-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <FaEdit className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 text-left">
                <p className="font-semibold text-gray-700">Update Profile</p>
                <p className="text-xs text-gray-600">Edit your information</p>
              </div>
            </motion.button>
          </>
        )}
      </div>

      {/* Status Indicator */}
      {/* <div className="mt-6 pt-4 border-t border-gray-100">
        <div className="flex items-center gap-2 text-sm">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-gray-600">Online</span>
        </div>
      </div> */}
    </motion.div>
  );
};

export default ProfileActionButtons;
