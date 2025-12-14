import { Clock } from "lucide-react";

const RightCard = () => {
  return (
    <div className="glass-card relative p-6 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/20 shadow-xl hover:scale-105 transition-transform duration-300 lg:top-20 md:-right-55 lg:right-0 md:-top-30 top-30">
      <Clock className="h-6 w-6 text-primary absolute top-4 left-4" />
      <h3 className="text-primary text-lg font-bold mt-8">
        Track Your Impact <br /> in Real Time
      </h3>
      <p className="text-secondary text-sm mt-2 ">5 issues resolved today</p>
      <div className="w-3 h-3 bg-primary rounded-full animate-pulse absolute bottom-4 right-4"></div>
      <div className="w-3 h-3 bg-white rounded-full animate-pulse absolute bottom-4 right-8"></div>
      <div className="w-3 h-3 bg-primary rounded-full animate-pulse absolute bottom-4 right-12"></div>
    </div>
  );
};

export default RightCard;
