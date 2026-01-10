import { useState } from "react";
import { MapContainer, TileLayer, Circle } from "react-leaflet";
import { Layers } from "lucide-react";
import "leaflet/dist/leaflet.css";

const InteractiveHeatMap = () => {
  const [selectedArea, setSelectedArea] = useState(null);

  // Mock data for demonstration with clickable information
  const heatmapData = [
    {
      position: [23.8103, 90.4125],
      intensity: "high",
      count: 15,
      area: "Dhanmondi",
      details: {
        openIssues: 8,
        inProgress: 4,
        resolved: 3,
        categories: ["Road Damage", "Garbage", "Water Supply"],
      },
    },
    {
      position: [23.7808, 90.4142],
      intensity: "medium",
      count: 8,
      area: "Old Dhaka",
      details: {
        openIssues: 3,
        inProgress: 2,
        resolved: 3,
        categories: ["Traffic", "Noise", "Sanitation"],
      },
    },
    {
      position: [23.8223, 90.3654],
      intensity: "low",
      count: 3,
      area: "Uttara",
      details: {
        openIssues: 1,
        inProgress: 1,
        resolved: 1,
        categories: ["Lighting", "Parks"],
      },
    },
    {
      position: [23.7461, 90.3742],
      intensity: "high",
      count: 12,
      area: "Gulshan",
      details: {
        openIssues: 6,
        inProgress: 3,
        resolved: 3,
        categories: ["Road Damage", "Traffic", "Utilities"],
      },
    },
    {
      position: [23.7936, 90.4066],
      intensity: "medium",
      count: 6,
      area: "Ramna",
      details: {
        openIssues: 2,
        inProgress: 2,
        resolved: 2,
        categories: ["Parks", "Security", "Maintenance"],
      },
    },
  ];

  const getMarkerColor = (intensity) => {
    switch (intensity) {
      case "high":
        return "#ef4444"; // Red
      case "medium":
        return "#f59e0b"; // Amber
      case "low":
        return "#10b981"; // Green
      default:
        return "#6b7280";
    }
  };

  const getMarkerRadius = (intensity) => {
    switch (intensity) {
      case "high":
        return 900;
      case "medium":
        return 600;
      case "low":
        return 400;
      default:
        return 500;
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-3xl p-8 shadow-sm border border-gray-700 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 flex-col md:flex-row">
        <div className="flex items-center gap-4 flex-col md:flex-row">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-sm">
            <Layers size={20} className="text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Issue Density Map</h3>
            <p className="text-gray-400 text-sm">
              Real-time civic issue distribution
            </p>
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <span className="text-xs text-gray-300">High</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-amber-500"></div>
            <span className="text-xs text-gray-300">Medium</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="text-xs text-gray-300">Low</span>
          </div>
        </div>
      </div>

      {/* Map Container */}
      <div className="md:h-96 h-64 rounded-2xl overflow-hidden shadow-inner border border-gray-600 relative">
        <MapContainer
          center={[23.8103, 90.4125]}
          zoom={12}
          className="h-full w-full"
          style={{ backgroundColor: "#1f2937" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          />

          {heatmapData.map((point, index) => (
            <Circle
              key={index}
              center={point.position}
              radius={getMarkerRadius(point.intensity)}
              pathOptions={{
                fillColor: getMarkerColor(point.intensity),
                color: getMarkerColor(point.intensity),
                weight: 2,
                opacity: 0.8,
                fillOpacity: 0.6,
              }}
              eventHandlers={{
                click: () => setSelectedArea(point),
              }}
            />
          ))}
        </MapContainer>

        {/* Custom Popup Overlay */}
        {selectedArea && (
          <div className="absolute top-4 md:left-4 left-0 bg-white/95 backdrop-blur-xl rounded-2xl md:p-6 p-2 shadow-2xl border border-white/30 min-w-[150px] z-[1000] scroll-auto">
            <div className="flex justify-between items-start md:mb-4 mb-1">
              <h4 className="font-bold text-gray-800 md:text-lg text-sm">
                {selectedArea.area}
              </h4>
              <button
                onClick={() => setSelectedArea(null)}
                className="text-gray-500 hover:text-red-500 transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="md:space-y-3 space-y-1 md:mb-4 mb-1">
              <div className="flex justify-between">
                <span className="md:text-sm text-xs text-gray-600">
                  Open Issues:
                </span>
                <span className="font-semibold text-red-600 md:text-sm text-xs">
                  {selectedArea.details.openIssues}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="md:text-sm text-xs text-gray-600">
                  In Progress:
                </span>
                <span className="font-semibold text-amber-600 md:text-sm text-xs">
                  {selectedArea.details.inProgress}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="md:text-sm text-xs text-gray-600">
                  Resolved:
                </span>
                <span className="font-semibold text-green-600 md:text-sm text-xs">
                  {selectedArea.details.resolved}
                </span>
              </div>
            </div>

            <div>
              <p className="md:text-sm text-xs font-semibold text-gray-700 mb-2 md:block hidden">
                Top Categories:
              </p>
              <div className="hidden md:flex flex-wrap gap-2">
                {selectedArea.details.categories.map((category, idx) => (
                  <span
                    key={idx}
                    className="md:text-sm text-xs bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium"
                  >
                    {category}
                  </span>
                ))}
              </div>
            </div>

            <p className="text-xs text-gray-500 mt-4 capitalize">
              Priority:{" "}
              <span className="font-semibold">{selectedArea.intensity}</span>
            </p>
          </div>
        )}
      </div>

      {/* Stats Bar */}
      <div className="grid md:grid-cols-3 gap-4 mt-6">
        <div className="text-center p-4 bg-gray-800/50 rounded-xl border border-gray-600">
          <div className="text-2xl font-bold text-white">
            {heatmapData.length}
          </div>
          <div className="text-xs text-gray-400 uppercase tracking-wider">
            Active Zones
          </div>
        </div>
        <div className="text-center p-4 bg-gray-800/50 rounded-xl border border-gray-600">
          <div className="text-2xl font-bold text-white">
            {heatmapData.reduce((sum, point) => sum + point.count, 0)}
          </div>
          <div className="text-xs text-gray-400 uppercase tracking-wider">
            Total Issues
          </div>
        </div>
        <div className="text-center p-4 bg-gray-800/50 rounded-xl border border-gray-600">
          <div className="text-2xl font-bold text-white">92%</div>
          <div className="text-xs text-gray-400 uppercase tracking-wider">
            Coverage
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveHeatMap;
