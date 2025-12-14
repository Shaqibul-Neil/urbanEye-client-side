import { Clock, MessageCircle } from "lucide-react";

const Tags = () => {
  return (
    <div className="relative w-full bg-base-200 rounded-3xl lg:flex lg:justify-between">
      {/* Left */}
      <div className="col-span-1 bg-white rounded-tl-3xl pt-10 lg:px-15 px-10 space-y-4 lg:w-[35%] w-full pb-10 lg:pb-0 lg:[clip-path:polygon(0_0,89%_0,91%_14%,100%_76%,100%_100%,0_100%)]">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center">
            <MessageCircle className="h-6 w-6 text-white" />
          </div>
          <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center">
            <Clock className="h-6 w-6 text-white" />
          </div>
        </div>
        <h3 className="text-secondary font-bold text-lg">
          From potholes to streetlights, your reports help the city act faster.
        </h3>
        <button
          onClick={() => {
            const element = document.getElementById("feature-section");
            element?.scrollIntoView({ behavior: "smooth" });
          }}
          className="mt-3 text-primary transition-all duration-300 hover:text-secondary underline cursor-pointer"
        >
          See Features
        </button>
      </div>
      {/* middle */}
      <div className="bg-white lg:w-[30%] w-full">
        <div className="bg-base-200 py-8">
          <h2 className="text-5xl text-center font-black text-primary tracking-tighter">
            Your Voice,
            <br /> Your City
          </h2>{" "}
        </div>
      </div>
      {/* right */}
      <div className="rounded-tr-3xl bg-white p-10 lg:pl-30 space-y-4 lg:w-[35%] lg:[clip-path:polygon(100%_0,11%_0,8%_18%,0_79%,0_100%,100%_100%)]">
        <div className="w-40 border-primary border rounded-full h-10 flex justify-center items-center">
          <p className="text-primary">Issues Resolved </p>
        </div>
        <div className="flex lg:flex-col md:flex-row flex-col gap-2">
          <div className="gap-2 items-center flex">
            <h3 className="text-5xl text-primary">15K+</h3>
            <p className="text-primary font-light">
              Issues <br className="hidden lg:block" /> resolved
              <br className="hidden lg:block" /> last month
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tags;
