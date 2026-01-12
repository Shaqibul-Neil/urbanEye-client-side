import { motion } from "framer-motion";
import { FiCheckCircle, FiAlertCircle } from "react-icons/fi";
import { MdManageAccounts, MdPolicy } from "react-icons/md";
import InfoCard from "../../components/common/card/info card/InfoCard";
import { Cookie } from "lucide-react";

const CookiePolicy = () => {
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
          <Cookie />
          How We Use Cookies
        </p>
        <h2 className="font-extrabold text-4xl md:text-5xl tracking-tight">
          <span className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 bg-clip-text text-transparent">
            Cookie
          </span>{" "}
          <span className="text-secondary">Policy</span>
        </h2>
      </motion.div>
      <div className="grid lg:grid-cols-2 gap-8">
        <InfoCard
          icon={<FiCheckCircle />}
          title="What Are Cookies?"
          delay={0.1}
        >
          <p>
            Cookies are small files stored on your device to improve user
            experience.
          </p>
          <p>They help remember preferences, login info, and analyze usage.</p>
          <p>Cookies ensure smoother navigation and personalization.</p>
        </InfoCard>
        <InfoCard icon={<MdPolicy />} title="How We Use Cookies" delay={0.2}>
          <p>
            Cookies track user activity to optimize performance and
            recommendations.
          </p>
          <p>They help deliver targeted content and relevant updates.</p>
          <p>
            Performance and analytics cookies are also used for improvement.
          </p>
        </InfoCard>
        <InfoCard
          icon={<MdManageAccounts />}
          title="Managing Cookies"
          delay={0.3}
        >
          <p>
            Users can accept, decline, or delete cookies through their browser
            settings.
          </p>
          <p>Disabling cookies may affect certain URBANi functionalities.</p>
          <p>We recommend enabling essential cookies for best experience.</p>
        </InfoCard>
        <InfoCard
          icon={<FiAlertCircle />}
          title="Third-Party Cookies"
          delay={0.4}
        >
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
