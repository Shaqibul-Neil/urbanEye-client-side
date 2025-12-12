import FeaturesSection from "../../components/home/feature/FeatureSection";
import CitizenFeedback from "../../components/home/feedback/CitizenFeedback";
import HowItWorks from "../../components/home/how it works/HowItWorks";
import LatestResolved from "../../components/home/latest resolved/LatestResolved";
import AboutSection from "../../components/home/about/AboutSection";
import Banner from "../../components/home/banner/Banner";
import GlobeSection from "../../components/home/globe/GlobeSection";

const Home = () => {
  return (
    <div>
      {/* Banner Section */}
      <section className="pb-16">
        <Banner />
      </section>

      {/* About Us Section */}
      <div className="bg-base-200">
        <section className="container mx-auto lg:py-20 md:py-24 py-8 lg:px-6">
          <AboutSection />
        </section>
      </div>
      {/* Latest Resolved Section */}
      <section className="container mx-auto lg:py-24 md:py-20 py-8 lg:px-6 px-5 z-5 relative">
        <LatestResolved />
      </section>

      {/* Globe Section */}
      <section className="container mx-auto lg:mt-40 lg:mb-20 md:mt-24 md:py-12 py-8 lg:px-6 bg-secondary lg:rounded-3xl relative h-[550px]">
        <GlobeSection />
      </section>

      {/* Feature Section */}
      <section className="bg-linear-to-br from-white via-[#f8f9ff] to-white lg:px-6">
        <div className="container mx-auto">
          <FeaturesSection />
        </div>
      </section>

      {/* How It works Section */}
      <section className="container mx-auto lg:pt-24 md:pt-20 pt-8 lg:px-6">
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
