import { useState, useEffect } from "react";

const GlobeSectionEditor = () => {
  const [activeTab, setActiveTab] = useState("content");
  const [globeData, setGlobeData] = useState(null);
  const [updateContent, setUpdateContent] = useState(null);
  const [updateStyle, setUpdateStyle] = useState(null);
  const [handleSave, setHandleSave] = useState(null);

  useEffect(() => {
    // Get data from window (set by GlobeSection component)
    const checkForData = () => {
      if (window.globeSectionData) {
        setGlobeData(window.globeSectionData.globeData);
        setUpdateContent(() => window.globeSectionData.updateContent);
        setUpdateStyle(() => window.globeSectionData.updateStyle);
        setHandleSave(() => window.globeSectionData.handleSave);
      } else {
        // Retry after a short delay if data isn't available yet
        setTimeout(checkForData, 100);
      }
    };
    checkForData();

    // Set up interval to keep data in sync
    const interval = setInterval(() => {
      if (window.globeSectionData) {
        setGlobeData(window.globeSectionData.globeData);
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  if (!globeData || !updateContent || !updateStyle || !handleSave) {
    return <div>Loading globe editor...</div>;
  }

  const fontSizeOptions = [
    { value: "text-sm", label: "Small" },
    { value: "text-base", label: "Base" },
    { value: "text-lg", label: "Large" },
    { value: "text-xl", label: "XL" },
    { value: "text-2xl", label: "2XL" },
    { value: "text-3xl", label: "3XL" },
    { value: "text-4xl", label: "4XL" },
    { value: "text-5xl", label: "5XL" },
    { value: "md:text-5xl text-4xl", label: "4XL/5XL Responsive" }
  ];

  const fontWeightOptions = [
    { value: "font-normal", label: "Normal" },
    { value: "font-medium", label: "Medium" },
    { value: "font-semibold", label: "Semibold" },
    { value: "font-bold", label: "Bold" },
    { value: "font-extrabold", label: "Extra Bold" }
  ];

  const textAlignOptions = [
    { value: "text-left", label: "Left" },
    { value: "text-center", label: "Center" },
    { value: "text-right", label: "Right" }
  ];

  const colorOptions = [
    { value: "text-white", label: "White" },
    { value: "text-white/80", label: "White 80%" },
    { value: "text-primary", label: "Primary Blue" },
    { value: "text-secondary", label: "Secondary Dark" },
    { value: "text-gray-300", label: "Light Gray" },
    { value: "text-black", label: "Black" }
  ];

  return (
    <div className="space-y-4">
      {/* Tab Navigation */}
      <div className="flex border-b">
        <button
          onClick={() => setActiveTab("content")}
          className={`px-4 py-2 font-medium ${
            activeTab === "content"
              ? "border-b-2 border-primary text-primary"
              : "text-gray-600"
          }`}
        >
          Content
        </button>
        <button
          onClick={() => setActiveTab("style")}
          className={`px-4 py-2 font-medium ${
            activeTab === "style"
              ? "border-b-2 border-primary text-primary"
              : "text-gray-600"
          }`}
        >
          Style
        </button>
      </div>

      {/* Content Tab */}
      {activeTab === "content" && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Main Title</label>
            <input
              type="text"
              value={globeData.content.mainTitle}
              onChange={(e) => updateContent('mainTitle', e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Main title..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Subtitle</label>
            <input
              type="text"
              value={globeData.content.subtitle}
              onChange={(e) => updateContent('subtitle', e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Subtitle..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea
              value={globeData.content.description}
              onChange={(e) => updateContent('description', e.target.value)}
              className="w-full p-2 border rounded"
              rows="4"
              placeholder="Description text..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">CTA Button Text</label>
            <input
              type="text"
              value={globeData.content.ctaText}
              onChange={(e) => updateContent('ctaText', e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Explore Issue"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">CTA Button Link</label>
            <input
              type="text"
              value={globeData.content.ctaLink}
              onChange={(e) => updateContent('ctaLink', e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="/all-issues"
            />
          </div>
        </div>
      )}

      {/* Style Tab */}
      {activeTab === "style" && (
        <div className="space-y-6">
          {/* Main Title Styles */}
          <div className="border-b pb-4">
            <h4 className="font-medium mb-3">Main Title</h4>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium mb-1">Font Size</label>
                <select
                  value={globeData.styles.mainTitle.fontSize}
                  onChange={(e) => updateStyle('mainTitle', 'fontSize', e.target.value)}
                  className="w-full p-1 border rounded text-sm"
                >
                  {fontSizeOptions.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium mb-1">Font Weight</label>
                <select
                  value={globeData.styles.mainTitle.fontWeight}
                  onChange={(e) => updateStyle('mainTitle', 'fontWeight', e.target.value)}
                  className="w-full p-1 border rounded text-sm"
                >
                  {fontWeightOptions.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium mb-1">Text Align</label>
                <select
                  value={globeData.styles.mainTitle.textAlign}
                  onChange={(e) => updateStyle('mainTitle', 'textAlign', e.target.value)}
                  className="w-full p-1 border rounded text-sm"
                >
                  {textAlignOptions.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium mb-1">Color</label>
                <select
                  value={globeData.styles.mainTitle.color}
                  onChange={(e) => updateStyle('mainTitle', 'color', e.target.value)}
                  className="w-full p-1 border rounded text-sm"
                >
                  {colorOptions.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Subtitle Styles */}
          <div className="border-b pb-4">
            <h4 className="font-medium mb-3">Subtitle</h4>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium mb-1">Font Size</label>
                <select
                  value={globeData.styles.subtitle.fontSize}
                  onChange={(e) => updateStyle('subtitle', 'fontSize', e.target.value)}
                  className="w-full p-1 border rounded text-sm"
                >
                  {fontSizeOptions.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium mb-1">Font Weight</label>
                <select
                  value={globeData.styles.subtitle.fontWeight}
                  onChange={(e) => updateStyle('subtitle', 'fontWeight', e.target.value)}
                  className="w-full p-1 border rounded text-sm"
                >
                  {fontWeightOptions.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium mb-1">Color</label>
                <select
                  value={globeData.styles.subtitle.color}
                  onChange={(e) => updateStyle('subtitle', 'color', e.target.value)}
                  className="w-full p-1 border rounded text-sm"
                >
                  {colorOptions.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Description Styles */}
          <div>
            <h4 className="font-medium mb-3">Description</h4>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium mb-1">Color</label>
                <select
                  value={globeData.styles.description.color}
                  onChange={(e) => updateStyle('description', 'color', e.target.value)}
                  className="w-full p-1 border rounded text-sm"
                >
                  {colorOptions.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium mb-1">Text Align</label>
                <select
                  value={globeData.styles.description.textAlign}
                  onChange={(e) => updateStyle('description', 'textAlign', e.target.value)}
                  className="w-full p-1 border rounded text-sm"
                >
                  {textAlignOptions.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Reset Button Only */}
          <div className="pt-4 border-t">
            <button
              onClick={() => {
                // Reset to default styles
                const defaultStyles = {
                  mainTitle: {
                    fontSize: "md:text-5xl text-4xl",
                    fontWeight: "font-bold",
                    color: "text-white",
                    textAlign: "text-center"
                  },
                  subtitle: {
                    fontSize: "md:text-5xl text-4xl", 
                    fontWeight: "font-bold",
                    color: "text-white",
                    textAlign: "text-center"
                  },
                  description: {
                    fontSize: "",
                    color: "text-white/80",
                    textAlign: "text-center"
                  }
                };
                
                Object.keys(defaultStyles).forEach(element => {
                  Object.keys(defaultStyles[element]).forEach(property => {
                    updateStyle(element, property, defaultStyles[element][property]);
                  });
                });
              }}
              className="btn btn-outline btn-sm"
            >
              Reset to Default Styles
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GlobeSectionEditor;