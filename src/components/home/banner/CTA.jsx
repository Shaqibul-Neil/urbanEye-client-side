import { Link } from "react-router";

const CTA = () => {
  return (
    <div className="flex justify-center items-center  wave">
      <div className="flex justify-center items-center lg:w-60 w-56 border-primary border rounded-full h-16">
        <Link
          className="lg:w-56 w-52 bg-primary text-white font-bold h-12 rounded-full shadow-lg text-lg transition duration-300 text-center cursor-pointer relative z-12 hover:bg-white hover:text-primary flex justify-center items-center"
          to={"/all-issues"}
        >
          Explore Issue
        </Link>
      </div>
    </div>
  );
};

export default CTA;
