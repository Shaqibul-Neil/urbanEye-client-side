import { motion } from "framer-motion";
import { BsFillShieldLockFill } from "react-icons/bs";
import { FiCheckCircle, FiAlertCircle } from "react-icons/fi";
import InfoCard from "../../components/common/card/info card/InfoCard";
import { ShieldCheck } from "lucide-react";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen max-w-7xl mx-auto py-16 px-4 space-y-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.6 }}
        className="relative"
      >
        <div className="absolute left-0 -top-6 h-24 w-24 opacity-20">
          <svg viewBox="0 0 100 100" className="h-full w-full">
            {Array.from({ length: 100 }).map((_, i) => (
              <circle
                key={i}
                cx={(i % 10) * 10}
                cy={Math.floor(i / 10) * 10}
                r="1.5"
                fill="#2563eb"
              />
            ))}
          </svg>
        </div>
        <p className="section-title text-primary">
          <ShieldCheck />
          Your data, your rights
        </p>
        <h2 className="font-extrabold text-4xl md:text-5xl tracking-tight">
          <span className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 bg-clip-text text-transparent">
            Privacy{" "}
          </span>{" "}
          <span className="text-secondary">Policy</span>
        </h2>
      </motion.div>
      <div className="grid lg:grid-cols-2 gap-8">
        <InfoCard
          icon={<BsFillShieldLockFill />}
          title="Data Collection"
          delay={0.1}
        >
          <p>
            URBANi collects personal information to provide and improve
            services.
          </p>
          <p>
            Information includes name, email, phone, and activity on the
            platform.
          </p>
          <p>We do not sell user data to third parties without consent.</p>
        </InfoCard>
        <InfoCard icon={<FiCheckCircle />} title="Data Usage" delay={0.2}>
          <p>
            Data is used to improve user experience and provide tailored
            recommendations.
          </p>
          <p>Notifications and updates are sent based on user preferences.</p>
          <p>Data analytics help improve URBANi features and services.</p>
        </InfoCard>
        <InfoCard icon={<FiAlertCircle />} title="Data Security" delay={0.3}>
          <p>Industry-standard encryption is used to protect data.</p>
          <p>Only authorized personnel have access to sensitive data.</p>
          <p>Regular audits are conducted to ensure safety and compliance.</p>
        </InfoCard>
        <InfoCard icon={<FiCheckCircle />} title="User Rights" delay={0.4}>
          <p>
            Users can request access, correction, or deletion of their data.
          </p>
          <p>Privacy preferences can be managed in account settings.</p>
          <p>Users have the right to withdraw consent at any time.</p>
        </InfoCard>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
