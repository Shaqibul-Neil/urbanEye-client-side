import { motion } from "framer-motion";
import { FiCheckCircle, FiAlertCircle } from "react-icons/fi";
import { MdPolicy } from "react-icons/md";
import { AiOutlineClockCircle } from "react-icons/ai";
import InfoCard from "../../components/common/card/info card/InfoCard";
import { ScrollText } from "lucide-react";

const TermsAndConditions = () => {
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
          <ScrollText />
          Our Platform Rules
        </p>
        <h2 className="font-extrabold  text-4xl md:text-5xl tracking-tight">
          <span className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 bg-clip-text text-transparent">
            Terms &
          </span>{" "}
          <span className="text-secondary">Conditions</span>
        </h2>
      </motion.div>
      <div className="grid lg:grid-cols-2 gap-8">
        <InfoCard
          icon={<FiCheckCircle />}
          title="User Responsibilities"
          delay={0.2}
        >
          <p>
            Users must provide accurate information when registering and using
            URBANi services. Misuse may lead to account suspension.
          </p>
          <p>
            All actions on the platform must comply with local laws and
            regulations.
          </p>
          <p>Users should report any suspicious or harmful content promptly.</p>
        </InfoCard>
        <InfoCard icon={<MdPolicy />} title="Content Policy" delay={0.3}>
          <p>All content shared must be lawful, relevant, and respectful.</p>
          <p>
            Offensive, abusive, or misleading content is strictly prohibited.
          </p>
          <p>
            URBANi reserves the right to remove content violating guidelines.
          </p>
        </InfoCard>
        <InfoCard
          icon={<AiOutlineClockCircle />}
          title="Service Availability"
          delay={0.4}
        >
          <p>
            URBANi strives for uninterrupted service but cannot guarantee
            constant availability.
          </p>
          <p>Scheduled maintenance will be announced in advance.</p>
          <p>
            Some features may not work properly during updates or maintenance.
          </p>
        </InfoCard>
        <InfoCard
          icon={<FiAlertCircle />}
          title="Account Termination"
          delay={0.5}
        >
          <p>Accounts violating rules may be terminated without notice.</p>
          <p>
            URBANi reserves the right to block users engaging in illegal or
            harmful behavior.
          </p>
          <p>
            Appeals can be made via support channels within 30 days of
            termination.
          </p>
        </InfoCard>
      </div>
    </div>
  );
};

export default TermsAndConditions;
