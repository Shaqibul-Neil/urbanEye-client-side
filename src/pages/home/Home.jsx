import FeaturesSection from "../../components/home/feature/FeatureSection";
import CitizenFeedback from "../../components/home/feedback/CitizenFeedback";
import HowItWorks from "../../components/home/how it works/HowItWorks";
import LatestResolved from "../../components/home/latest resolved/LatestResolved";
import AboutSection from "../../components/home/about/AboutSection";
import EditableWrapper from "../../components/page builder/EditableWrapper";

import GlobeSection from "../../components/home/globe/GlobeSection";
import EditorTopBar from "../../components/page builder/EditorTopBar";
import SectionEditor from "../../components/page builder/SectionEditor";
import useEditorMode from "../../hooks/page builder/useEditorMode";

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
      {/* Latest Resolved Section */}
      <section className="container mx-auto lg:pb-24 md:pb-20 py-8 lg:px-6 px-5 z-5 relative">
        <LatestResolved />
      </section>

      {/* Globe Section */}
      <section className="container mx-auto lg:mt-40 lg:mb-20 md:mt-24 mt-40 md:py-12 py-8 lg:px-6 bg-secondary lg:rounded-3xl relative h-[550px]">
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
      <section className="container mx-auto lg:pt-24 md:pt-20 py-16 lg:px-6">
        <EditableWrapper sectionKey="how-it-works-section">
          <HowItWorks />
        </EditableWrapper>
      </section>

      {/* Testimonials */}
      <section className="bg-linear-to-br from-white via-[#f8f9ff] to-white lg:py-24 md:py-16 lg:px-6 py-16">
        <div className="container mx-auto">
          <CitizenFeedback />
        </div>
      </section>
    </div>
  );
};

export default Home;
