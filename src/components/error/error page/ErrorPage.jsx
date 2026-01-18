import { Link } from "react-router";
import error from "../../../assets/error.webp";
import Navbar from "../../common/navbar/Navbar";
import Footer from "../../common/footer/Footer";
const ErrorPage = () => {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <header className="lg:px-8 py-2 md:px-4 px-2">
          <Navbar />
        </header>

        <main className="flex-1 pb-24">
          <div className="flex flex-col my-16 w-11/12 mx-auto lg:px-8 md:px-4 px-2 gap-8">
            <div className="flex justify-center">
              <img src={error} alt="" className="w-lg" />
            </div>

            <h2 className="text-center md:text-2xl text-xl text-gray-600 font-bold tracking-wider">
              404: This page couldn't be found. Maybe it was deleted, moved, or
              just got tired of existing. Either way, you can head home or
              explore other issues instead.
            </h2>
            <div className="flex justify-center md:flex-row flex-col items-center gap-4">
              <Link to="/" className="btn btn-primary btn-outline">
                Go Home
              </Link>
              <Link to="/all-issues" className="btn-primary btn">
                Show All issues
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default ErrorPage;
