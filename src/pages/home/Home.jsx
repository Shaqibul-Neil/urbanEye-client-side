import { MdArrowOutward } from "react-icons/md";
import FeaturesSection from "../../components/home/feature/FeatureSection";
import CitizenFeedback from "../../components/home/feedback/CitizenFeedback";
import HowItWorks from "../../components/home/how it works/HowItWorks";
import LatestResolved from "../../components/home/latest resolved/LatestResolved";
import { Star } from "lucide-react";

const Home = () => {
  return (
    <div>
      {/* Latest Resolved Section */}
      <div className="container mx-auto py-28">
        <LatestResolved />
      </div>

      {/* Feature Section */}
      <div className="bg-linear-to-br from-white via-[#f8f9ff] to-white">
        <div className="container mx-auto">
          <FeaturesSection />
        </div>
      </div>

      {/* How It works Section */}
      <div className="container mx-auto lg:py-16 md:py-12 py-8">
        <HowItWorks />
      </div>

      {/* Testimonials */}
      <div className="container mx-auto">
        <CitizenFeedback />
      </div>
    </div>
  );
};

export default Home;
