import ppl from "../../../assets/ppl.jpg";
import hand from "../../../assets/hand.jpg";
import student from "../../../assets/student.jpg";
import skyline from "../../../assets/skyline.jpg";
const AboutSection = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2">
      {/* Left Side */}
      <div className="relative">
        <div>
          <img
            src={skyline}
            alt=""
            className="w-40 h-36 rounded-l-2xl object-cover absolute -top-1 left-50 border-12 border-white z-10"
          />
        </div>
        <div className="clip-top-left">
          <img
            src={ppl}
            alt=""
            className="w-96 h-96 object-cover  overflow-hidden"
          />
        </div>
        <div>
          <img
            src={hand}
            alt=""
            className="rounded-l-2xl w-64 h-64 absolute -top-20 right-20 border-12 border-white object-cover"
          />
        </div>
        <div>
          <img
            src={student}
            alt=""
            className="rounded-b-2xl w-48 h-48 absolute top-20 right-40 border-12 border-white object-cover"
          />
        </div>
      </div>
      {/* Right side */}
      <div className="space-y-4">
        <h2 className="font-extrabold text-primary tracking-tight text-4xl md:text-5xl text-right">
          Urban Eye is a{" "}
          <span className="text-secondary">citizen-focused platform</span> that
          lets residents
        </h2>
        <p className="text-right text-gray-700 leading-relaxed">
          report public issues directly to local authorities. From potholes and
          broken streetlights to stray animals and pollution hazards, every
          report is tracked for timely resolution.
        </p>
        <p className="pl-14 text-right text-gray-700 leading-relaxed">
          Our mission is simple: <strong>empower communities</strong> to
          actively improve their neighborhoods, ensure transparency, and make
          cities safer and cleaner for everyone.
        </p>
        <p className="pl-14 text-right text-gray-700 leading-relaxed">
          By connecting citizens and authorities, Urban Eye transforms feedback
          into action, giving every user a tangible impact on their city’s
          development.
        </p>
      </div>
    </div>
  );
};

export default AboutSection;
