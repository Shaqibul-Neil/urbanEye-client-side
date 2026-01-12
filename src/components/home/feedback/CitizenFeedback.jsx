import FeedbackSlider from "./FeedbackSlider";
import skyline from "../../../assets/skyline.jpg";
import { motion } from "framer-motion";
const CitizenFeedback = () => {
  return (
    <section>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center lg:ml-4">
        {/* Left Content */}
        <div
          className="w-full lg:h-160 h-96 space-y-4 bg-cover bg-center p-6 rounded-2xl relative z-5"
          style={{ backgroundImage: `url(${skyline})` }}
        >
          <div className="flex relative">
            <div className="bg-white md:w-80 w-56 px-2 py-1  z-11 absolute -left-6 -top-7 middle">
              <motion.h2
                initial={{ y: 40, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="font-extrabold bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-600 bg-clip-text text-transparent tracking-tight text-3xl md:text-5xl"
              >
                See What Our
              </motion.h2>
            </div>
            <div className="bg-white md:w-96 w-60 px-2 rounded-r-2xl py-2 absolute top-1 md:top-6 md:-left-6 -left-6 z-10 second">
              <motion.h2
                initial={{ y: 40, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
                className="font-extrabold text-secondary tracking-tight text-3xl md:text-5xl"
              >
                Satisfied Clients
              </motion.h2>
            </div>
            <div className="bg-white md:w-80 w-56 px-2 py-2 absolute md:top-20 top-10.5 -left-6 rounded-br-3xl">
              <motion.h2
                initial={{ y: 40, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
                className="font-extrabold text-primary tracking-tight text-3xl md:text-5xl"
              >
                Have To Say
              </motion.h2>
            </div>

            <div className="w-52 p-3 rounded-2xl absolute lg:top-120 top-64 right-0 bg-primary flex justify-center group hover:bg-white transition-all duration-300 cursor-pointer">
              {" "}
              {/* <<< KEY CHANGE: absolute bottom-0 left-0 */}
              <button className="p-3 bg-white text-primary rounded-lg shadow-md hover:bg-primary transition hover:text-white cursor-pointer font-bold">
                Share Your Feedback
              </button>
            </div>
          </div>
        </div>
        {/* Right Feedback */}
        <div>
          <div className="h-screen w-full mx-auto">
            <FeedbackSlider />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CitizenFeedback;
