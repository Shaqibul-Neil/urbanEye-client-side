import { motion } from "framer-motion";
import { FiCheckCircle, FiAlertCircle } from "react-icons/fi";
import { MdPolicy } from "react-icons/md";
import { AiOutlineClockCircle } from "react-icons/ai";
import InfoCard from "../../components/common/card/info card/InfoCard";

const TermsAndConditions = () => {
  return (
    <div className="min-h-screen max-w-7xl mx-auto py-16 px-4 space-y-12">
      <h2 className="font-extrabold text-primary text-4xl md:text-5xl tracking-tight">
        Terms & <span className="text-secondary">Conditions</span>
      </h2>
      <div className="grid lg:grid-cols-2 gap-8">
        <InfoCard icon={<FiCheckCircle />} title="User Responsibilities">
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
        <InfoCard icon={<MdPolicy />} title="Content Policy">
          <p>All content shared must be lawful, relevant, and respectful.</p>
          <p>
            Offensive, abusive, or misleading content is strictly prohibited.
          </p>
          <p>
            URBANi reserves the right to remove content violating guidelines.
          </p>
        </InfoCard>
        <InfoCard icon={<AiOutlineClockCircle />} title="Service Availability">
          <p>
            URBANi strives for uninterrupted service but cannot guarantee
            constant availability.
          </p>
          <p>Scheduled maintenance will be announced in advance.</p>
          <p>
            Some features may not work properly during updates or maintenance.
          </p>
        </InfoCard>
        <InfoCard icon={<FiAlertCircle />} title="Account Termination">
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
