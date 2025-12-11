import { Link } from "react-router";
import forbidden from "../../../assets/forbidden.jpg";
const Forbidden = () => {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <main className="flex-1 pb-24">
          <div className="flex flex-col my-24 w-11/12 mx-auto lg:px-8 md:px-4 px-2 gap-8">
            <div className="flex justify-center">
              <img src={forbidden} alt="" className="w-80" />
            </div>

            <h2 className="text-center md:text-2xl text-xl text-gray-600 font-bold tracking-wider">
              403 – Forbidden You don’t have permission to access this page.
              <br /> This usually happens when: Your account doesn’t have the
              required privileges. <br />
              You’re trying to view content that’s restricted. <br />
              Your session has expired or isn’t authorized for this action.{" "}
              <br />
              If you believe this is a mistake, please contact support or try
              logging in again.
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

export default Forbidden;
