import { Link } from "react-router";

const CTA = () => {
  return (
    <div>
      <Link
        to="/all-issues"
        className="
          relative flex justify-center items-center gap-2
          w-48 px-4 py-2 rounded-full overflow-hidden
          border-2 border-gray-50
          bg-gray-50 backdrop-blur-md
          text-primary text-lg lg:font-semibold
          shadow-xl isolation-auto
          hover:text-white
          group

          before:content-['']
          before:absolute
          before:top-0 before:left-[-100%]
          before:w-full before:h-full
          before:bg-blue-500
          before:transition-all before:duration-700
          hover:before:left-0
          before:-z-10
          before:rounded-full
        "
      >
        Explore Issue
        <svg
          className="
            w-8 h-8 p-2 rounded-full border border-gray-700
            rotate-45 transition-all duration-300 ease-linear
            group-hover:rotate-90
            group-hover:bg-gray-50
            group-hover:border-none
          "
          viewBox="0 0 16 19"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            className="fill-gray-800"
            d="M7 18C7 18.5523 7.44772 19 8 19C8.55228 19 9 18.5523 9 18H7ZM8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 18L9 1H7L7 18H9Z"
          />
        </svg>
      </Link>
    </div>
  );
};

export default CTA;
