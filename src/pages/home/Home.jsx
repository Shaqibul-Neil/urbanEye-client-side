import { MdArrowOutward } from "react-icons/md";
import FeaturesSection from "../../components/home/feature/FeatureSection";
import CitizenFeedback from "../../components/home/feedback/CitizenFeedback";
import HowItWorks from "../../components/home/how it works/HowItWorks";
import LatestResolved from "../../components/home/latest resolved/LatestResolved";
import { Star } from "lucide-react";
import AboutSection from "../../components/home/about/AboutSection";

const Home = () => {
  return (
    <div>
      {/* About Us Section */}
      <section className="container mx-auto lg:py-16 md:py-12 py-8">
        <AboutSection />
      </section>
      {/* Latest Resolved Section */}
      <section className="container mx-auto lg:py-16 md:py-12 py-8">
        <LatestResolved />
      </section>

      {/* Feature Section */}
      <section className="bg-linear-to-br from-white via-[#f8f9ff] to-white">
        <div className="container mx-auto">
          <FeaturesSection />
        </div>
      </section>

      {/* How It works Section */}
      <section className="container mx-auto lg:pt-16 md:pt-12 pt-8">
        <HowItWorks />
      </section>

      {/* Testimonials */}
      <section className="bg-linear-to-br from-white via-[#f8f9ff] to-white lg:py-24 md:py-16 py-8">
        <div className="container mx-auto">
          <CitizenFeedback />
        </div>
      </section>
    </div>
  );
};

export default Home;
