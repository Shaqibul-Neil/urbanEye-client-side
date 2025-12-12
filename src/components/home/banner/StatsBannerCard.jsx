import { CheckCircle, Users, Building } from "lucide-react";

const stats = [
  {
    id: 1,
    number: "1,254",
    label: "Resolved",
    icon: <CheckCircle className="h-4 w-4 text-primary" />,
    anim: "animate-seq-1",
  },
  {
    id: 2,
    number: "356",
    label: "Staff",
    icon: <Users className="h-4 w-4 text-primary" />,
    anim: "animate-seq-2",
  },
  {
    id: 3,
    number: "72",
    label: "Cities",
    icon: <Building className="h-4 w-4 text-primary" />,
    anim: "animate-seq-3",
  },
];

const StatsBannerCard = () => {
  return (
    <div className="grid grid-cols-3 mt-4 gap-1">
      {stats.map((stat) => (
        <div
          key={stat.id}
          className={`bg-white rounded-2xl shadow-lg p-2 gap-1 w-24 border-l-4 border-primary hover:-translate-x-2 hover:-translate-y-2 transition-transform duration-300 
            ${stat.anim}`}
        >
          {/* Icon */}
          <div className="flex items-center justify-center">{stat.icon}</div>
          {/* Text */}
          <div className="flex flex-col items-center">
            <span className="text-lg font-extrabold text-primary">
              {stat.number}
            </span>
            <span className="text-sm text-secondary font-light">
              {stat.label}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsBannerCard;
