import { motion } from "framer-motion";
import { BsFillShieldLockFill } from "react-icons/bs";
import { FiCheckCircle, FiAlertCircle } from "react-icons/fi";
import InfoCard from "../../components/common/card/info card/InfoCard";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen max-w-7xl mx-auto py-16 px-4 space-y-12">
      <h2 className="font-extrabold text-primary text-4xl md:text-5xl tracking-tight text-center">
        Privacy <span className="text-secondary">Policy</span>
      </h2>
      <div className="grid lg:grid-cols-2 gap-8">
        <InfoCard icon={<BsFillShieldLockFill />} title="Data Collection">
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
        <InfoCard icon={<FiCheckCircle />} title="Data Usage">
          <p>
            Data is used to improve user experience and provide tailored
            recommendations.
          </p>
          <p>Notifications and updates are sent based on user preferences.</p>
          <p>Data analytics help improve URBANi features and services.</p>
        </InfoCard>
        <InfoCard icon={<FiAlertCircle />} title="Data Security">
          <p>Industry-standard encryption is used to protect data.</p>
          <p>Only authorized personnel have access to sensitive data.</p>
          <p>Regular audits are conducted to ensure safety and compliance.</p>
        </InfoCard>
        <InfoCard icon={<FiCheckCircle />} title="User Rights">
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
