import { useState, useEffect } from "react";

const FeaturesSectionEditor = () => {
  const [activeTab, setActiveTab] = useState("content");
  const [featuresData, setFeaturesData] = useState(null);
  const [updateContent, setUpdateContent] = useState(null);
  const [updateFeature, setUpdateFeature] = useState(null);
  const [updateStyle, setUpdateStyle] = useState(null);
  const [handleSave, setHandleSave] = useState(null);

  useEffect(() => {
    // Get data from window (set by FeaturesSection component)
    const checkForData = () => {
      if (window.featuresSectionData) {
        setFeaturesData(window.featuresSectionData.featuresData);
        setUpdateContent(() => window.featuresSectionData.updateContent);
        setUpdateFeature(() => window.featuresSectionData.updateFeature);
        setUpdateStyle(() => window.featuresSectionData.updateStyle);
        setHandleSave(() => window.featuresSectionData.handleSave);
      } else {
        // Retry after a short delay if data isn't available yet
        setTimeout(checkForData, 100);
      }
    };
    checkForData();

    // Set up interval to keep data in sync
    const interval = setInterval(() => {
      if (window.featuresSectionData) {
        setFeaturesData(window.featuresSectionData.featuresData);
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  if (!featuresData || !updateContent || !updateFeature || !updateStyle || !handleSave) {
    return <div>Loading features editor...</div>;
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
    { value: "text-4xl md:text-5xl", label: "4XL/5XL Responsive" }
  ];

  const fontWeightOptions = [
    { value: "font-normal", label: "Normal" },
    { value: "font-medium", label: "Medium" },
    { value: "font-semibold", label: "Semibold" },
    { value: "font-bold", label: "Bold" },
    { value: "font-extrabold", label: "Extra Bold" }
  ];

  const colorOptions = [
    { value: "text-primary", label: "Primary Blue" },
    { value: "text-secondary", label: "Secondary Dark" },
    { value: "text-gray-600", label: "Gray 600" },
    { value: "text-gray-700", label: "Gray 700" },
    { value: "text-black", label: "Black" },
    { value: "text-white", label: "White" }
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
              value={featuresData.content.mainHeading}
              onChange={(e) => updateContent('mainHeading', e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Build a..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Highlight Text</label>
            <input
              type="text"
              value={featuresData.content.highlightText}
              onChange={(e) => updateContent('highlightText', e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Safer Community"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea
              value={featuresData.content.description}
              onChange={(e) => updateContent('description', e.target.value)}
              className="w-full p-2 border rounded"
              rows="3"
              placeholder="Description text..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Button Text</label>
            <input
              type="text"
              value={featuresData.content.buttonText}
              onChange={(e) => updateContent('buttonText', e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Report an Issue"
            />
          </div>

          {/* Features List */}
          <div>
            <label className="block text-sm font-medium mb-2">Features</label>
            {(featuresData.content.features.length > 0 ? featuresData.content.features : [
              { title: "Verified Staff Handling", description: "Every report is managed by authorized municipal staff, ensuring accountability and quality response." },
              { title: "Location-Based Tracking", description: "Browse reported problems around your area and monitor progress in real time." },
              { title: "Instant Status Notifications", description: "Get notified whenever your submitted issue is assigned, reviewed, or resolved." },
              { title: "Emergency Priority System", description: "Critical public safety concerns are auto-flagged and forwarded to emergency teams instantly." }
            ]).map((feature, index) => (
              <div key={index} className="border rounded p-3 mb-3">
                <div className="mb-2">
                  <label className="block text-xs font-medium mb-1">Feature {index + 1} Title</label>
                  <input
                    type="text"
                    value={feature.title}
                    onChange={(e) => updateFeature(index, 'title', e.target.value)}
                    className="w-full p-1 border rounded text-sm"
                    placeholder="Feature title..."
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1">Feature {index + 1} Description</label>
                  <textarea
                    value={feature.description}
                    onChange={(e) => updateFeature(index, 'description', e.target.value)}
                    className="w-full p-1 border rounded text-sm"
                    rows="2"
                    placeholder="Feature description..."
                  />
                </div>
              </div>
            ))}
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
                  value={featuresData.styles.mainHeading.fontSize}
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
                  value={featuresData.styles.mainHeading.fontWeight}
                  onChange={(e) => updateStyle('mainHeading', 'fontWeight', e.target.value)}
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
                  value={featuresData.styles.mainHeading.color}
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

          {/* Highlight Text Styles */}
          <div className="border-b pb-4">
            <h4 className="font-medium mb-3">Highlight Text</h4>
            <div>
              <label className="block text-xs font-medium mb-1">Color</label>
              <select
                value={featuresData.styles.highlightText.color}
                onChange={(e) => updateStyle('highlightText', 'color', e.target.value)}
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
            <div>
              <label className="block text-xs font-medium mb-1">Color</label>
              <select
                value={featuresData.styles.description.color}
                onChange={(e) => updateStyle('description', 'color', e.target.value)}
                className="w-full p-1 border rounded text-sm"
              >
                {colorOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Reset Button Only */}
          <div className="pt-4 border-t">
            <button
              onClick={() => {
                // Reset to default styles
                const defaultStyles = {
                  mainHeading: {
                    fontSize: "text-4xl md:text-5xl",
                    fontWeight: "font-extrabold",
                    color: "text-primary"
                  },
                  highlightText: {
                    color: "text-secondary"
                  },
                  description: {
                    color: "text-gray-600"
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

export default FeaturesSectionEditor;