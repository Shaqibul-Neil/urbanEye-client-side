import { lazy, Suspense } from "react";
import EditableWrapper from "../../components/page builder/EditableWrapper";
import EditorTopBar from "../../components/page builder/EditorTopBar";
import SectionEditor from "../../components/page builder/SectionEditor";
import useEditorMode from "../../hooks/page builder/useEditorMode";

// Lazy load heavy sections
const FeaturesSection = lazy(() =>
  import("../../components/home/feature/FeatureSection")
);
const CitizenFeedback = lazy(() =>
  import("../../components/home/feedback/CitizenFeedback")
);
const HowItWorks = lazy(() =>
  import("../../components/home/how it works/HowItWorks")
);
const LatestResolved = lazy(() =>
  import("../../components/home/latest resolved/LatestResolved")
);
const AboutSection = lazy(() =>
  import("../../components/home/about/AboutSection")
);

const GlobeSection = lazy(() =>
  import("../../components/home/globe/GlobeSection")
);
const CityPulseDashboard = lazy(() =>
  import("../../components/home/city pulse/CityPulseDashboard")
);
const ImpactStories = lazy(() =>
  import("../../components/home/impact stories/ImpactStories")
);

const SectionLoader = ({ height = "h-96", className = "" }) => (
  <div
    className={`w-full ${height} bg-gray-100/50 animate-pulse rounded-3xl ${className}`}
  ></div>
);

const Home = () => {
  const { editMode } = useEditorMode();
  return (
    <div>
      {editMode && <EditorTopBar />}
      {editMode && <SectionEditor />}

      {/* About Us Section */}
      <div>
        <section className="lg:pb-24 pb-16 pt-8 xl:px-16 lg:px-8 max-w-[1400px] mx-auto">
          <EditableWrapper sectionKey="about-section">
            <Suspense fallback={<SectionLoader height="h-[500px]" />}>
              <AboutSection />
            </Suspense>
          </EditableWrapper>
        </section>
      </div>

      {/* City Pulse Dashboard Section */}
      <section id="city-pulse">
        <Suspense fallback={<SectionLoader height="h-[800px]" />}>
          <CityPulseDashboard />
        </Suspense>
      </section>

      {/* Latest Resolved Section */}
      <section className="container mx-auto lg:py-20 md:py-16 py-16 lg:px-6 px-5 z-5 relative">
        <Suspense fallback={<SectionLoader />}>
          <LatestResolved />
        </Suspense>
      </section>

      {/* Globe Section */}
      <section className="container mx-auto lg:mt-40 lg:mb-20 md:mt-48 mt-60 md:py-12 py-8 lg:px-6 bg-secondary lg:rounded-3xl relative h-[550px]">
        <EditableWrapper sectionKey="globe-section">
          <Suspense
            fallback={<SectionLoader height="h-full" className="bg-white/5" />}
          >
            <GlobeSection />
          </Suspense>
        </EditableWrapper>
      </section>

      {/* Feature Section */}
      <section
        className="bg-linear-to-br from-white via-[#f8f9ff] to-white lg:px-6"
        id="feature-section"
      >
        <div className="container mx-auto">
          <EditableWrapper sectionKey="features-section">
            <Suspense fallback={<SectionLoader height="h-[600px]" />}>
              <FeaturesSection />
            </Suspense>
          </EditableWrapper>
        </div>
      </section>

      {/* How It works Section */}
      <section className="container mx-auto lg:pt-24 md:pt-20 py-10 lg:px-6">
        <EditableWrapper sectionKey="how-it-works-section">
          <Suspense fallback={<SectionLoader height="h-[500px]" />}>
            <HowItWorks />
          </Suspense>
        </EditableWrapper>
      </section>

      {/* Impact Stories Section */}
      <section className="bg-linear-to-br from-white via-[#f8f9ff] to-white lg:px-6">
        <div className="container mx-auto">
          <Suspense fallback={<SectionLoader />}>
            <ImpactStories />
          </Suspense>
        </div>
      </section>

      {/* Testimonials */}
      <section className="lg:py-24 md:py-16 lg:px-16  py-16 px-5  max-w-[1400px] mx-auto">
        <div className="container mx-auto">
          <Suspense fallback={<SectionLoader />}>
            <CitizenFeedback />
          </Suspense>
        </div>
      </section>
    </div>
  );
};

export default Home;
