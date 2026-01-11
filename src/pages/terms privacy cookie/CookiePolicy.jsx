import { motion } from "framer-motion";
import { FiCheckCircle, FiAlertCircle } from "react-icons/fi";
import { MdPolicy } from "react-icons/md";
import InfoCard from "../../components/common/card/info card/InfoCard";

const CookiePolicy = () => {
  return (
    <div className="min-h-screen max-w-7xl mx-auto py-16 px-4 space-y-12">
      <h2 className="font-extrabold text-primary text-4xl md:text-5xl tracking-tight text-center">
        Cookie <span className="text-secondary">Policy</span>
      </h2>
      <div className="grid lg:grid-cols-2 gap-8">
        <InfoCard icon={<FiCheckCircle />} title="What Are Cookies?">
          <p>
            Cookies are small files stored on your device to improve user
            experience.
          </p>
          <p>They help remember preferences, login info, and analyze usage.</p>
          <p>Cookies ensure smoother navigation and personalization.</p>
        </InfoCard>
        <InfoCard icon={<MdPolicy />} title="How We Use Cookies">
          <p>
            Cookies track user activity to optimize performance and
            recommendations.
          </p>
          <p>They help deliver targeted content and relevant updates.</p>
          <p>
            Performance and analytics cookies are also used for improvement.
          </p>
        </InfoCard>
        <InfoCard icon={<FiCheckCircle />} title="Managing Cookies">
          <p>
            Users can accept, decline, or delete cookies through their browser
            settings.
          </p>
          <p>Disabling cookies may affect certain URBANi functionalities.</p>
          <p>We recommend enabling essential cookies for best experience.</p>
        </InfoCard>
        <InfoCard icon={<FiAlertCircle />} title="Third-Party Cookies">
          <p>
            Some services on URBANi may use third-party cookies for analytics or
            social features.
          </p>
          <p>
            We do not control these cookies but provide transparency on usage.
          </p>
          <p>Third-party cookies comply with applicable privacy regulations.</p>
        </InfoCard>
      </div>
    </div>
  );
};

export default CookiePolicy;
