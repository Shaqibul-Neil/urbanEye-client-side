import { motion } from "framer-motion";
import { FaUser, FaShieldAlt, FaTools } from "react-icons/fa";

const ProfileIdentityCard = ({ user, myInfo }) => {
  // Role-specific styling
  const getRoleConfig = (role) => {
    switch (role) {
      case "admin":
        return {
          bgGradient: "from-blue-500 via-blue-600 to-blue-700",
          icon: <FaShieldAlt className="w-6 h-6 text-secondary" />,
          badgeColor: "bg-white/20 backdrop-blur-md text-white",
          glowColor: "shadow-blue-500/20",
        };
      case "staff":
        return {
          bgGradient: "from-blue-500 via-blue-600 to-blue-700",
          icon: <FaTools className="w-6 h-6 text-secondary" />,
          badgeColor: "bg-white/20 backdrop-blur-md text-white",
          glowColor: "shadow-blue-500/20",
        };
      default: // citizen
        return {
          bgGradient: "from-blue-500 via-blue-600 to-blue-700",
          icon: <FaUser className="w-6 h-6 text-secondary" />,
          badgeColor: "bg-white/20 backdrop-blur-md text-white",
          glowColor: "shadow-blue-500/20",
        };
    }
  };

  const roleConfig = getRoleConfig(myInfo?.role);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative overflow-hidden"
    >
      {/* Main Card */}
      <div
        className={`bg-gradient-to-br ${roleConfig.bgGradient} rounded-2xl md:p-8 p-4 shadow-xl ${roleConfig.glowColor} relative overflow-hidden`}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10 z-9">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -translate-y-16 translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full translate-y-12 -translate-x-12"></div>
        </div>

        {/* Content */}
        <div className="relative z-10">
          <div className="flex items-center flex-col md:flex-row gap-6">
            {/* Profile Image with Glow */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="relative"
            >
              <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-sm p-1 shadow-2xl">
                <img
                  alt="profile"
                  src={user?.photoURL}
                  className="w-full h-full object-cover rounded-full border-2 border-white/30"
                />
              </div>
              {/* Role Icon Badge */}
              <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center shadow-lg">
                {roleConfig.icon}
              </div>
            </motion.div>

            {/* User Info */}
            <div className="flex-1">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <h1 className="text-2xl font-bold text-white mb-1">
                  {user?.displayName}
                </h1>
                <p className="text-white/80 text-sm  mb-3">{user?.email}</p>

                {/* Role Badge */}
                <div
                  className={`mx-auto md:mx-0 w-28 flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold border ${roleConfig.badgeColor}`}
                >
                  <span className="w-2 h-2 bg-secondary rounded-full animate-pulse text-secondary"></span>
                  {myInfo?.role?.toUpperCase()}
                </div>
              </motion.div>
            </div>

            {/* Premium Badge for Citizens */}
            {myInfo?.role === "citizen" && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="text-center"
              >
                <div
                  className={`px-4 py-2 rounded-xl text-sm font-bold ${
                    myInfo?.isPremium
                      ? "bg-yellow-400/20 text-yellow-300 border border-yellow-400/30"
                      : "bg-white/10 text-white/70 border border-white/20"
                  }`}
                >
                  {myInfo?.isPremium ? "✨ PREMIUM" : "STANDARD"}
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Animated Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{
              x: [0, 100, 0],
              y: [0, -50, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute top-1/4 left-1/4 w-2 h-2 bg-white/20 rounded-full"
          />
          <motion.div
            animate={{
              x: [0, -80, 0],
              y: [0, 60, 0],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "linear",
              delay: 5,
            }}
            className="absolute top-3/4 right-1/3 w-1 h-1 bg-white/30 rounded-full"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default ProfileIdentityCard;
