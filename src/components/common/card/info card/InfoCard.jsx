import { easeInOut, motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: easeInOut,
    },
  },
  hover: {
    scale: 1.05,
    y: -6,
  },
};

const InfoCard = ({ icon, title, children }) => {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      whileHover="hover"
      viewport={{ once: true }}
      className="bg-white p-8 rounded-xl shadow-sm space-y-4 transform transition-all duration-700"
    >
      <div className="flex items-center gap-4 text-primary">
        <div className="text-3xl">{icon}</div>
        <h3 className="text-2xl font-bold text-secondary">{title}</h3>
      </div>
      <div className="text-gray-600 text-sm space-y-2">{children}</div>
    </motion.div>
  );
};

export default InfoCard;
