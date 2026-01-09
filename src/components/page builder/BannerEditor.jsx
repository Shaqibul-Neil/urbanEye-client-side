import { useState, useEffect } from "react";

const BannerEditor = () => {
  const [activeTab, setActiveTab] = useState("content");
  const [bannerData, setBannerData] = useState(null);
  const [updateContent, setUpdateContent] = useState(null);
  const [updateStyle, setUpdateStyle] = useState(null);
  const [handleSave, setHandleSave] = useState(null);

  useEffect(() => {
    // Get data from window (set by Banner component)
    const checkForData = () => {
      if (window.bannerData) {
        setBannerData(window.bannerData.bannerData);
        setUpdateContent(() => window.bannerData.updateContent);
        setUpdateStyle(() => window.bannerData.updateStyle);
        setHandleSave(() => window.bannerData.handleSave);
      } else {
        // Retry after a short delay if data isn't available yet
        setTimeout(checkForData, 100);
      }
    };
    checkForData();

    // Set up interval to keep data in sync
    const interval = setInterval(() => {
      if (window.bannerData) {
        setBannerData(window.bannerData.bannerData);
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  if (!bannerData || !updateContent || !updateStyle || !handleSave) {
    return <div>Loading banner editor...</div>;
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
    { value: "text-lg md:text-xl", label: "LG/XL Responsive" }
  ];

  const fontWeightOptions = [
    { value: "font-normal", label: "Normal" },
    { value: "font-medium", label: "Medium" },
    { value: "font-semibold", label: "Semibold" },
    { value: "font-bold", label: "Bold" },
    { value: "font-black", label: "Black" }
  ];

  const textAlignOptions = [
    { value: "text-left", label: "Left" },
    { value: "text-center", label: "Center" },
    { value: "text-right", label: "Right" }
  ];

  const colorOptions = [
    { value: "text-white", label: "White" },
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
            <textarea
              value={bannerData.content?.title || ""}
              onChange={(e) => updateContent('title', e.target.value)}
              className="w-full p-2 border rounded"
              rows="2"
              placeholder="Main banner title..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea
              value={bannerData.content?.paragraph || ""}
              onChange={(e) => updateContent('paragraph', e.target.value)}
              className="w-full p-2 border rounded"
              rows="3"
              placeholder="Banner description..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">CTA Button Text</label>
            <input
              type="text"
              value={bannerData.content?.ctaText || ""}
              onChange={(e) => updateContent('ctaText', e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Button text..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">CTA Button Link</label>
            <input
              type="text"
              value={bannerData.content?.ctaLink || ""}
              onChange={(e) => updateContent('ctaLink', e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Button link..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Issues Resolved</label>
            <input
              type="text"
              value={bannerData.content?.issueResolved || ""}
              onChange={(e) => updateContent('issueResolved', e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Number of issues resolved..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Issues Reported</label>
            <input
              type="text"
              value={bannerData.content?.issuesReported || ""}
              onChange={(e) => updateContent('issuesReported', e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Number of issues reported..."
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
                  value={bannerData.styles?.title?.fontSize || "text-5xl"}
                  onChange={(e) => updateStyle('title', 'fontSize', e.target.value)}
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
                  value={bannerData.styles?.title?.fontWeight || "font-black"}
                  onChange={(e) => updateStyle('title', 'fontWeight', e.target.value)}
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
                  value={bannerData.styles?.title?.color || "text-white"}
                  onChange={(e) => updateStyle('title', 'color', e.target.value)}
                  className="w-full p-1 border rounded text-sm"
                >
                  {colorOptions.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Paragraph Styles */}
          <div className="border-b pb-4">
            <h4 className="font-medium mb-3">Description</h4>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium mb-1">Font Size</label>
                <select
                  value={bannerData.styles?.paragraph?.fontSize || "text-lg md:text-xl"}
                  onChange={(e) => updateStyle('paragraph', 'fontSize', e.target.value)}
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
                  value={bannerData.styles?.paragraph?.color || "text-white"}
                  onChange={(e) => updateStyle('paragraph', 'color', e.target.value)}
                  className="w-full p-1 border rounded text-sm"
                >
                  {colorOptions.map(option => (
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
                  title: {
                    fontSize: "text-5xl",
                    fontWeight: "font-black",
                    color: "text-white"
                  },
                  paragraph: {
                    fontSize: "text-lg md:text-xl",
                    color: "text-white"
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

export default BannerEditor;