import useEditorMode from "../../hooks/page builder/useEditorMode";
import AboutSectionEditor from "./AboutSectionEditor";
import BannerEditor from "./BannerEditor";
import GlobeSectionEditor from "./GlobeSectionEditor";
import FeaturesSectionEditor from "./FeaturesSectionEditor";
import HowItWorksSectionEditor from "./HowItWorksSectionEditor";
import { CircleCheckBig, X } from "lucide-react";

const SectionEditor = () => {
  const { activeSection, setActiveSection } = useEditorMode();

  if (!activeSection) return null;

  const handleSave = () => {
    // Get the appropriate save function based on active section
    if (activeSection === "banner" && window.bannerData?.handleSave) {
      window.bannerData.handleSave();
    } else if (activeSection === "about-section" && window.aboutSectionData?.handleSave) {
      window.aboutSectionData.handleSave();
    } else if (activeSection === "globe-section" && window.globeSectionData?.handleSave) {
      window.globeSectionData.handleSave();
    } else if (activeSection === "features-section" && window.featuresSectionData?.handleSave) {
      window.featuresSectionData.handleSave();
    } else if (activeSection === "how-it-works-section" && window.howItWorksSectionData?.handleSave) {
      window.howItWorksSectionData.handleSave();
    }
  };

  return (
    <div className="fixed right-6 top-24 w-96 bg-white shadow-xl rounded-xl z-[9999] max-h-[80vh] overflow-y-auto">
      <div className="flex justify-between items-center p-4 border-b">
        <h3 className="font-bold capitalize">Editing: {activeSection}</h3>
        <div className="flex gap-2">
          <button
            onClick={handleSave}
            className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-full transition-colors"
            title="Save Changes"
          >
            <CircleCheckBig size={20} />
          </button>
          <button
            onClick={() => setActiveSection(null)}
            className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full transition-colors"
            title="Close Editor"
          >
            <X size={20} />
          </button>
        </div>
      </div>

      <div className="p-4">
        {activeSection === "banner" && <BannerEditor />}
        {activeSection === "about-section" && <AboutSectionEditor />}
        {activeSection === "globe-section" && <GlobeSectionEditor />}
        {activeSection === "features-section" && <FeaturesSectionEditor />}
        {activeSection === "how-it-works-section" && <HowItWorksSectionEditor />}
      </div>
    </div>
  );
};
export default SectionEditor;
