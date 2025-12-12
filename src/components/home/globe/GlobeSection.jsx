import { Link } from "react-router";
import globe from "../../../assets/globe.png";
const GlobeSection = () => {
  return (
    <>
      <div className="mx-auto md:w-[500px] w-full bg-white rounded-full md:h-[450px] h-84 flex justify-center items-center absolute -top-60 left-1/2 -translate-x-1/2">
        <div className="flex justify-center items-center">
          <img src={globe} alt="" className="w-full" />
        </div>
      </div>
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 lg:w-1/2 w-full space-y-4 px-5">
        <h2 className="md:text-5xl text-4xl text-white text-center font-bold">
          Urban Issues
          <br /> Shared Citizen Solutions
        </h2>
        <p className="text-center text-white/80">
          URBANi empowers citizens to highlight issues, collaborate with
          neighbors, and see real solutions unfold. Together, we transform our
          city—one report, one upvote at a time.
        </p>
        <div className="flex justify-center items-center relative z-10 mt-8">
          <div className="flex justify-center items-center w-64 border-white border rounded-full h-20 wave">
            <div className="flex justify-center items-center w-60 border-primary border rounded-full h-16">
              <Link
                className="w-56 bg-white text-primary font-bold py-3 px-5 rounded-full shadow-lg text-lg transition duration-300 text-center cursor-pointer relative z-12"
                to={"/all-issues"}
              >
                Explore Issue
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GlobeSection;
