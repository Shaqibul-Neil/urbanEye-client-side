import { useState, useEffect } from "react";

const BannerEditor = () => {
  const [activeTab, setActiveTab] = useState("content");
  const [bannerData, setBannerData] = useState(null);
  const [updateContent, setUpdateContent] = useState(null);
  const [updateStyle, setUpdateStyle] = useState(null);
  const [handleSave, setHandleSave] = useState(null);

  useEffect(() => {
    const checkForBannerData = () => {
      if (window.bannerSectionData) {
        setBannerData(window.bannerSectionData.bannerData);
        setUpdateContent(() => window.bannerSectionData.updateContent);
        setUpdateStyle(() => window.bannerSectionData.updateStyle);
        setHandleSave(() => window.bannerSectionData.handleSave);
      }
    };

    checkForBannerData();
    const interval = setInterval(checkForBannerData, 100);
    return () => clearInterval(interval);
  }, []);

  if (!bannerData || !updateContent || !updateStyle || !handleSave) {
    return <div>Loading editor...</div>;
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
    { value: "text-6xl", label: "6XL" },
    { value: "text-4xl md:text-5xl", label: "4XL/5XL Responsive" },
    { value: "text-4xl md:text-6xl", label: "4XL/6XL Responsive" }
  ];

  const fontWeightOptions = [
    { value: "font-normal", label: "Normal" },
    { value: "font-medium", label: "Medium" },
    { value: "font-semibold", label: "Semibold" },
    { value: "font-bold", label: "Bold" },
    { value: "font-extrabold", label: "Extra Bold" }
  ];

  const colorOptions = [
    { value: "text-white", label: "White" },
    { value: "text-indigo-400", label: "Indigo 400" },
    { value: "text-purple-400", label: "Purple 400" },
    { value: "text-gray-400", label: "Gray 400" },
    { value: "text-gray-300", label: "Gray 300" },
    { value: "text-primary", label: "Primary Blue" },
    { value: "text-secondary", label: "Secondary Dark" }
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
            <label className="block text-sm font-medium mb-2">Main Heading</label>
            <input
              type="text"
              value={bannerData.content.mainHeading}
              onChange={(e) => updateContent("mainHeading", e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="The City"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Highlight Text 1</label>
            <input
              type="text"
              value={bannerData.content.highlightText1}
              onChange={(e) => updateContent("highlightText1", e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Speaks."
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Highlight Text 2</label>
            <input
              type="text"
              value={bannerData.content.highlightText2}
              onChange={(e) => updateContent("highlightText2", e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Listen."
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea
              value={bannerData.content.description}
              onChange={(e) => updateContent("description", e.target.value)}
              className="w-full p-2 border rounded"
              rows="3"
              placeholder="A living civic intelligence system..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Primary Button Text</label>
            <input
              type="text"
              value={bannerData.content.primaryButtonText}
              onChange={(e) => updateContent("primaryButtonText", e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Explore Issues"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Secondary Button Text</label>
            <input
              type="text"
              value={bannerData.content.secondaryButtonText}
              onChange={(e) => updateContent("secondaryButtonText", e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Report an Issue"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-sm font-medium mb-2">Stat 1 Value</label>
              <input
                type="text"
                value={bannerData.content.stat1Value}
                onChange={(e) => updateContent("stat1Value", e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="2.4K+"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Stat 1 Label</label>
              <input
                type="text"
                value={bannerData.content.stat1Label}
                onChange={(e) => updateContent("stat1Label", e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="Issues Tracked"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-sm font-medium mb-2">Stat 2 Value</label>
              <input
                type="text"
                value={bannerData.content.stat2Value}
                onChange={(e) => updateContent("stat2Value", e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="87%"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Stat 2 Label</label>
              <input
                type="text"
                value={bannerData.content.stat2Label}
                onChange={(e) => updateContent("stat2Label", e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="Resolution Rate"
              />
            </div>
          </div>
        </div>
      )}

      {/* Style Tab */}
      {activeTab === "style" && (
        <div className="space-y-6">
          {/* Main Heading Styles */}
          <div className="border-b pb-4">
            <h4 className="font-medium mb-3">Main Heading</h4>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium mb-1">Font Size</label>
                <select
                  value={bannerData.styles.mainHeading.fontSize}
                  onChange={(e) => updateStyle('mainHeading', 'fontSize', e.target.value)}
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
                  value={bannerData.styles.mainHeading.fontWeight}
                  onChange={(e) => updateStyle('mainHeading', 'fontWeight', e.target.value)}
                  className="w-full p-1 border rounded text-sm"
                >
                  {fontWeightOptions.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>
              <div className="col-span-2">
                <label className="block text-xs font-medium mb-1">Color</label>
                <select
                  value={bannerData.styles.mainHeading.color}
                  onChange={(e) => updateStyle('mainHeading', 'color', e.target.value)}
                  className="w-full p-1 border rounded text-sm"
                >
                  {colorOptions.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Highlight Text 1 Styles */}
          <div className="border-b pb-4">
            <h4 className="font-medium mb-3">Highlight Text 1</h4>
            <div>
              <label className="block text-xs font-medium mb-1">Color</label>
              <select
                value={bannerData.styles.highlightText1.color}
                onChange={(e) => updateStyle('highlightText1', 'color', e.target.value)}
                className="w-full p-1 border rounded text-sm"
              >
                {colorOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Highlight Text 2 Styles */}
          <div className="border-b pb-4">
            <h4 className="font-medium mb-3">Highlight Text 2</h4>
            <div>
              <label className="block text-xs font-medium mb-1">Color</label>
              <select
                value={bannerData.styles.highlightText2.color}
                onChange={(e) => updateStyle('highlightText2', 'color', e.target.value)}
                className="w-full p-1 border rounded text-sm"
              >
                {colorOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Description Styles */}
          <div>
            <h4 className="font-medium mb-3">Description</h4>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium mb-1">Font Size</label>
                <select
                  value={bannerData.styles.description.fontSize}
                  onChange={(e) => updateStyle('description', 'fontSize', e.target.value)}
                  className="w-full p-1 border rounded text-sm"
                >
                  {fontSizeOptions.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium mb-1">Color</label>
                <select
                  value={bannerData.styles.description.color}
                  onChange={(e) => updateStyle('description', 'color', e.target.value)}
                  className="w-full p-1 border rounded text-sm"
                >
                  {colorOptions.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BannerEditor;
