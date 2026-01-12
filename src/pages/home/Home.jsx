import FeaturesSection from "../../components/home/feature/FeatureSection";
import CitizenFeedback from "../../components/home/feedback/CitizenFeedback";
import HowItWorks from "../../components/home/how it works/HowItWorks";
import LatestResolved from "../../components/home/latest resolved/LatestResolved";
import AboutSection from "../../components/home/about/AboutSection";
import Banner from "../../components/home/banner/Banner";
import EditableWrapper from "../../components/page builder/EditableWrapper";

import GlobeSection from "../../components/home/globe/GlobeSection";
import EditorTopBar from "../../components/page builder/EditorTopBar";
import SectionEditor from "../../components/page builder/SectionEditor";
import useEditorMode from "../../hooks/page builder/useEditorMode";
import CityPulseDashboard from "../../components/home/city pulse/CityPulseDashboard";
import ImpactStories from "../../components/home/impact stories/ImpactStories";

const Home = () => {
  const { editMode } = useEditorMode();
  return (
    <div>
      {editMode && <EditorTopBar />}
      {editMode && <SectionEditor />}

      {/* About Us Section */}
      <div>
        <section className="container mx-auto lg:pb-24 pb-16 pt-8 lg:px-6">
          <EditableWrapper sectionKey="about-section">
            <AboutSection />
          </EditableWrapper>
        </section>
      </div>

      {/* City Pulse Dashboard Section */}
      <section id="city-pulse">
        <CityPulseDashboard />
      </section>

      {/* Latest Resolved Section */}
      <section className="container mx-auto lg:py-20 md:py-16 py-16 lg:px-6 px-5 z-5 relative">
        <LatestResolved />
      </section>

      {/* Globe Section */}
      <section className="container mx-auto lg:mt-40 lg:mb-20 md:mt-48 mt-60 md:py-12 py-8 lg:px-6 bg-secondary lg:rounded-3xl relative h-[550px]">
        <EditableWrapper sectionKey="globe-section">
          <GlobeSection />
        </EditableWrapper>
      </section>

      {/* Feature Section */}
      <section
        className="bg-linear-to-br from-white via-[#f8f9ff] to-white lg:px-6"
        id="feature-section"
      >
        <div className="container mx-auto">
          <EditableWrapper sectionKey="features-section">
            <FeaturesSection />
          </EditableWrapper>
        </div>
      </section>

      {/* How It works Section */}
      <section className="container mx-auto lg:pt-24 md:pt-20 py-10 lg:px-6">
        <EditableWrapper sectionKey="how-it-works-section">
          <HowItWorks />
        </EditableWrapper>
      </section>

      {/* Impact Stories Section */}
      <section className="bg-linear-to-br from-white via-[#f8f9ff] to-white lg:px-6">
        <div className="container mx-auto">
          <ImpactStories />
        </div>
      </section>

      {/* Testimonials */}
      <section className="lg:py-24 md:py-16 lg:px-6 py-16 px-5">
        <div className="container mx-auto">
          <CitizenFeedback />
        </div>
      </section>
    </div>
  );
};

export default Home;
