import CityPulseDashboard from "./CityPulseDashboard";

// This component now serves as a wrapper that renders the main CityPulseDashboard
// The data fetching logic has been moved into CityPulseDashboard for better organization
const CityPulseAnalytics = () => {
  return <CityPulseDashboard />;
};

export default CityPulseAnalytics;
