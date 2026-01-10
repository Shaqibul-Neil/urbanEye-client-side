import { Link } from "react-router";
import forbidden from "../../../assets/forbidden.jpg";
import { Home, ListChecks } from "lucide-react";
const Forbidden = () => {
  return (
    <>
      <div className="flex flex-col min-h-screen bg-white rounded-3xl max-w-[90%] mx-auto">
        <main className="flex-1 pb-24">
          <div className="flex flex-col my-24 w-11/12 mx-auto lg:px-8 md:px-4 px-2 gap-8">
            <div className="flex justify-center">
              <img src={forbidden} alt="" className="w-80" />
            </div>

            <h2 className="text-center md:text-xl text-lg text-gray-600 font-bold tracking-wider">
              403 – Forbidden You don’t have permission to access this page.
              <br /> This usually happens when: Your account doesn’t have the
              required privileges. <br />
              If you believe this is a mistake, please contact support or try
              logging in again.
            </h2>
            <div className="flex justify-center md:flex-row flex-col items-center gap-4">
              <Link to="/" className="btn btn-primary rounded-3xl hover:btn-secondary transition-all duration-300">
                <Home className="w-4 h-4" /> Go Home
              </Link>
              <Link to="/all-issues" className="btn btn-secondary rounded-3xl hover:btn-primary transition-all duration-300">
                <ListChecks className="w-4 h-4" /> Show All issues
              </Link>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Forbidden;
