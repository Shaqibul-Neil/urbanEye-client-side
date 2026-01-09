import { useState, useEffect } from "react";

const AboutSectionEditor = () => {
  const [activeTab, setActiveTab] = useState("content");
  const [aboutData, setAboutData] = useState(null);
  const [updateContent, setUpdateContent] = useState(null);
  const [updateStyle, setUpdateStyle] = useState(null);
  const [handleSave, setHandleSave] = useState(null);

  useEffect(() => {
    // Get data from window (set by AboutSection component)
    const checkForData = () => {
      if (window.aboutSectionData) {
        setAboutData(window.aboutSectionData.aboutData);
        setUpdateContent(() => window.aboutSectionData.updateContent);
        setUpdateStyle(() => window.aboutSectionData.updateStyle);
        setHandleSave(() => window.aboutSectionData.handleSave);
      } else {
        // Retry after a short delay if data isn't available yet
        setTimeout(checkForData, 100);
      }
    };
    checkForData();

    // Set up interval to keep data in sync
    const interval = setInterval(() => {
      if (window.aboutSectionData) {
        setAboutData(window.aboutSectionData.aboutData);
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  if (!aboutData || !updateContent || !updateStyle || !handleSave) {
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
    { value: "text-4xl md:text-5xl", label: "4XL/5XL Responsive" }
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
    { value: "text-primary", label: "Primary Blue" },
    { value: "text-secondary", label: "Secondary Dark" },
    { value: "text-gray-700", label: "Gray 700" },
    { value: "text-gray-600", label: "Gray 600" },
    { value: "text-black", label: "Black" },
    { value: "text-white", label: "White" }
  ];

  const paddingOptions = [
    { value: "", label: "None" },
    { value: "p-2", label: "Small" },
    { value: "p-4", label: "Medium" },
    { value: "p-8", label: "Large" },
    { value: "pl-14", label: "Left Large" },
    { value: "pr-14", label: "Right Large" }
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
            <textarea
              value={aboutData.content.mainHeading}
              onChange={(e) => updateContent('mainHeading', e.target.value)}
              className="w-full p-2 border rounded"
              rows="2"
              placeholder="Main heading text..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Highlight Text</label>
            <input
              type="text"
              value={aboutData.content.highlightText}
              onChange={(e) => updateContent('highlightText', e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Highlighted text..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">First Paragraph</label>
            <textarea
              value={aboutData.content.paragraph1}
              onChange={(e) => updateContent('paragraph1', e.target.value)}
              className="w-full p-2 border rounded"
              rows="3"
              placeholder="First paragraph text..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Second Paragraph</label>
            <textarea
              value={aboutData.content.paragraph2}
              onChange={(e) => updateContent('paragraph2', e.target.value)}
              className="w-full p-2 border rounded"
              rows="3"
              placeholder="Second paragraph text..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Strong Text</label>
            <input
              type="text"
              value={aboutData.content.strongText}
              onChange={(e) => updateContent('strongText', e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Bold text..."
            />
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
                  value={aboutData.styles.mainHeading.fontSize}
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
                  value={aboutData.styles.mainHeading.fontWeight}
                  onChange={(e) => updateStyle('mainHeading', 'fontWeight', e.target.value)}
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
                  value={aboutData.styles.mainHeading.textAlign}
                  onChange={(e) => updateStyle('mainHeading', 'textAlign', e.target.value)}
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
                  value={aboutData.styles.mainHeading.color}
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
                value={aboutData.styles.highlightText.color}
                onChange={(e) => updateStyle('highlightText', 'color', e.target.value)}
                className="w-full p-1 border rounded text-sm"
              >
                {colorOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Paragraph 1 Styles */}
          <div className="border-b pb-4">
            <h4 className="font-medium mb-3">First Paragraph</h4>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium mb-1">Color</label>
                <select
                  value={aboutData.styles.paragraph1.color}
                  onChange={(e) => updateStyle('paragraph1', 'color', e.target.value)}
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
                  value={aboutData.styles.paragraph1.textAlign}
                  onChange={(e) => updateStyle('paragraph1', 'textAlign', e.target.value)}
                  className="w-full p-1 border rounded text-sm"
                >
                  {textAlignOptions.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Paragraph 2 Styles */}
          <div>
            <h4 className="font-medium mb-3">Second Paragraph</h4>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium mb-1">Color</label>
                <select
                  value={aboutData.styles.paragraph2.color}
                  onChange={(e) => updateStyle('paragraph2', 'color', e.target.value)}
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
                  value={aboutData.styles.paragraph2.textAlign}
                  onChange={(e) => updateStyle('paragraph2', 'textAlign', e.target.value)}
                  className="w-full p-1 border rounded text-sm"
                >
                  {textAlignOptions.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>
              <div className="col-span-2">
                <label className="block text-xs font-medium mb-1">Padding</label>
                <select
                  value={aboutData.styles.paragraph2.padding}
                  onChange={(e) => updateStyle('paragraph2', 'padding', e.target.value)}
                  className="w-full p-1 border rounded text-sm"
                >
                  {paddingOptions.map(option => (
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
                  mainHeading: {
                    fontSize: "text-4xl md:text-5xl",
                    fontWeight: "font-extrabold",
                    textAlign: "text-right",
                    color: "text-primary",
                    padding: "",
                    margin: ""
                  },
                  highlightText: {
                    color: "text-secondary"
                  },
                  paragraph1: {
                    fontSize: "",
                    color: "text-gray-700",
                    textAlign: "text-right",
                    padding: "",
                    margin: ""
                  },
                  paragraph2: {
                    fontSize: "",
                    color: "text-gray-700",
                    textAlign: "text-right",
                    padding: "pl-14",
                    margin: ""
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

export default AboutSectionEditor;