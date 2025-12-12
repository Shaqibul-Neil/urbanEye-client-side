import FeaturesSection from "../../components/home/feature/FeatureSection";
import CitizenFeedback from "../../components/home/feedback/CitizenFeedback";
import HowItWorks from "../../components/home/how it works/HowItWorks";
import LatestResolved from "../../components/home/latest resolved/LatestResolved";
import AboutSection from "../../components/home/about/AboutSection";
import Banner from "../../components/home/banner/Banner";

const Home = () => {
  return (
    <div>
      {/* Banner Section */}
      <section className="pb-16 bg-base-200 mb-24">
        <Banner />
      </section>

      {/* About Us Section */}
      <section className="container mx-auto lg:py-16 md:py-12 py-8 lg:px-6">
        <AboutSection />
      </section>
      {/* Latest Resolved Section */}
      <section className="container mx-auto lg:py-16 md:py-12 py-8 lg:px-6">
        <LatestResolved />
      </section>

      {/* Feature Section */}
      <section className="bg-linear-to-br from-white via-[#f8f9ff] to-white lg:px-6">
        <div className="container mx-auto">
          <FeaturesSection />
        </div>
      </section>

      {/* How It works Section */}
      <section className="container mx-auto lg:pt-16 md:pt-12 pt-8 lg:px-6">
        <HowItWorks />
      </section>

      {/* Testimonials */}
      <section className="bg-linear-to-br from-white via-[#f8f9ff] to-white lg:py-24 md:py-16 lg:px-6 py-8">
        <div className="container mx-auto">
          <CitizenFeedback />
        </div>
      </section>
    </div>
  );
};

export default Home;
