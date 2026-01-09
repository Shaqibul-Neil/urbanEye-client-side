import { useState, useEffect } from "react";

const HowItWorksSectionEditor = () => {
  const [activeTab, setActiveTab] = useState("content");
  const [howItWorksData, setHowItWorksData] = useState(null);
  const [updateContent, setUpdateContent] = useState(null);
  const [updateStep, setUpdateStep] = useState(null);
  const [updateStyle, setUpdateStyle] = useState(null);
  const [handleSave, setHandleSave] = useState(null);

  useEffect(() => {
    // Get data from window (set by HowItWorks component)
    const checkForData = () => {
      if (window.howItWorksSectionData) {
        setHowItWorksData(window.howItWorksSectionData.howItWorksData);
        setUpdateContent(() => window.howItWorksSectionData.updateContent);
        setUpdateStep(() => window.howItWorksSectionData.updateStep);
        setUpdateStyle(() => window.howItWorksSectionData.updateStyle);
        setHandleSave(() => window.howItWorksSectionData.handleSave);
      } else {
        // Retry after a short delay if data isn't available yet
        setTimeout(checkForData, 100);
      }
    };
    checkForData();

    // Set up interval to keep data in sync
    const interval = setInterval(() => {
      if (window.howItWorksSectionData) {
        setHowItWorksData(window.howItWorksSectionData.howItWorksData);
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  if (!howItWorksData || !updateContent || !updateStep || !updateStyle || !handleSave) {
    return <div>Loading how it works editor...</div>;
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
              value={howItWorksData.content.mainHeading}
              onChange={(e) => updateContent('mainHeading', e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Our Work Process"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Highlight Text</label>
            <input
              type="text"
              value={howItWorksData.content.highlightText}
              onChange={(e) => updateContent('highlightText', e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Proven"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea
              value={howItWorksData.content.description}
              onChange={(e) => updateContent('description', e.target.value)}
              className="w-full p-2 border rounded"
              rows="4"
              placeholder="Description text..."
            />
          </div>

          {/* Steps List */}
          <div>
            <label className="block text-sm font-medium mb-2">Process Steps</label>
            {(howItWorksData.content.steps.length > 0 ? howItWorksData.content.steps : [
              { title: "Registration", description: "Sign up to start reporting and track issues." },
              { title: "Post an Issue", description: "Submit any public issue with details and location." },
              { title: "View Issues", description: "See issues reported by other citizens for transparency." },
              { title: "Track Issues", description: "Monitor updates and see real-time progress of issues." }
            ]).map((step, index) => (
              <div key={index} className="border rounded p-3 mb-3">
                <div className="mb-2">
                  <label className="block text-xs font-medium mb-1">Step {index + 1} Title</label>
                  <input
                    type="text"
                    value={step.title}
                    onChange={(e) => updateStep(index, 'title', e.target.value)}
                    className="w-full p-1 border rounded text-sm"
                    placeholder="Step title..."
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1">Step {index + 1} Description</label>
                  <textarea
                    value={step.description}
                    onChange={(e) => updateStep(index, 'description', e.target.value)}
                    className="w-full p-1 border rounded text-sm"
                    rows="2"
                    placeholder="Step description..."
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
                  value={howItWorksData.styles.mainHeading.fontSize}
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
                  value={howItWorksData.styles.mainHeading.fontWeight}
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
                  value={howItWorksData.styles.mainHeading.color}
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
                value={howItWorksData.styles.highlightText.color}
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
                value={howItWorksData.styles.description.color}
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

export default HowItWorksSectionEditor;