import { Link } from "react-router";
import error from "../../../assets/error.webp";
const ErrorComponent = () => {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <main className="flex-1 pb-24">
          <div className="flex flex-col my-24 w-11/12 mx-auto lg:px-8 md:px-4 px-2 gap-8">
            <div className="flex justify-center">
              <img src={error} alt="" className="w-80" />
            </div>

            <h2 className="text-center md:text-2xl text-xl text-gray-600 font-bold tracking-wider">
              404: This page couldn't be found. Maybe it was deleted, moved, or
              just got tired of existing. Either way, you can head home or
              explore other issues instead.
            </h2>
            <div className="flex justify-center md:flex-row flex-col items-center gap-4">
              <Link to="/" className="btn btn-outline btn-primary">
                Go Home
              </Link>
              <Link to="/all-issues" className="btn btn-primary">
                Show All issues
              </Link>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default ErrorComponent;
