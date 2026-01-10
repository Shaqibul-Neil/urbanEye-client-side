import { Edit } from "lucide-react";
import useEditorMode from "../../hooks/page builder/useEditorMode";

const EditableWrapper = ({ sectionKey, children }) => {
  const { editMode, setActiveSection } = useEditorMode();
  if (!editMode) return children;

  // Special handling for globe section to maintain positioning
  const isGlobeSection = sectionKey === "globe-section";

  if (isGlobeSection) {
    // For globe section, don't add any wrapper that affects positioning
    // Use a fragment to avoid any DOM interference
    return (
      <>
        {/* Edit icon positioned absolutely without affecting content */}
        <button
          onClick={() => setActiveSection(sectionKey)}
          className="absolute top-4 right-4 bg-primary text-white p-2 rounded-full opacity-90 hover:opacity-100 transition z-[1001] shadow-lg"
          style={{ position: "absolute" }}
        >
          <Edit size={16} />
        </button>
        {children}
      </>
    );
  }

  return (
    <div className="relative border-2 border-dashed border-primary group">
      {/* Edit icon */}
      <button
        onClick={() => setActiveSection(sectionKey)}
        className="absolute -bottom-3 right-2 bg-primary text-white p-1 rounded-full opacity-100 group-hover:opacity-100 transition z-10 cursor-pointer"
      >
        <Edit />
      </button>

      {children}
    </div>
  );
};

export default EditableWrapper;
