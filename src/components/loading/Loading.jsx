const Loading = () => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center z-[9999] bg-linear-to-br from-#2563eb via-#e5edf0 to-white backdrop-blur-sm overflow-hidden">
      {/* Circle + icon wrapper */}

      <div className="w-52 h-52 flex items-center justify-center z-10 rounded-full spin-circle relative loader-wave">
        <div className="w-40 h-40 flex items-center justify-center ml-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 600 600"
            className="w-32 h-32"
          >
            {/* Center SVG icon */}
            <path
              d="M485.75,475.54V252.367H358.838V134.2h-43.291V95.887h-13.124V62.716h-34.471V10.202h-15.307v52.514h-34.307
               v33.171h-13.125V134.2h-43.291v61.737H26.264V475.54H0v26.258h32.827h135.657h13.124h157.542h13.124h126.913H512V475.54H485.75z
               M168.484,482.103h-50.735v-35.002H96.687v35.002H45.952V215.631h122.533V482.103z
               M238.024,82.411h44.696v18.162h-44.696V82.411z
               M224.914,115.574h70.945v25.196h-70.945V115.574z
               M339.151,258.93v223.172h-62.365v-48.126h-32.812v48.126h-62.365V202.507
               v-48.613h30.166h97.21h30.166V258.93z
               M466.048,482.103h-46.356v-35.002h-21.062v35.002h-46.356V272.055h113.773V482.103z"
              fill="none"
              stroke="#2563eb"
              strokeWidth="6"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="3000"
              strokeDashoffset="3000"
            >
              <animate
                attributeName="stroke-dashoffset"
                from="3000"
                to="0"
                dur="2s"
                repeatCount="indefinite"
              />
            </path>
          </svg>
        </div>
      </div>

      {/* Loader text */}
      <div className="text-primary font-bold tracking-wide mt-6 relative z-10 text-center text-lg">
        <span>Loading insights…</span>
        <span className="inline-flex w-6 justify-between ml-2">
          <span className="dot" />
          <span className="dot" style={{ animationDelay: "0.18s" }} />
          <span className="dot" style={{ animationDelay: "0.36s" }} />
        </span>
      </div>

      <style>
        {`
          @keyframes dotBlink {
            0%, 20% { opacity: 0; transform: translateY(0); }
            30%, 60% { opacity: 1; transform: translateY(-1px); }
            100% { opacity: 0; transform: translateY(0); }
          }
          .dot {
            width: 0.35rem;
            height: 0.35rem;
            border-radius: 9999px;
            background: #2563eb;
            display: inline-block;
            animation: dotBlink 1.2s ease-in-out infinite;
          }

          @keyframes spin-circle {
            0% { transform: rotate(0deg) translateY(0); }
            25% { transform: rotate(90deg) translateY(-2px); }
            50% { transform: rotate(180deg) translateY(0); }
            75% { transform: rotate(270deg) translateY(2px); }
            100% { transform: rotate(360deg) translateY(0); }
          }
          .animate-spin-circle {
            transform-origin: 50% 50%;
            animation: spin-circle 2s linear infinite;
          }

          @keyframes float {
            0% { transform: translateY(0px); opacity: 0.5; }
            50% { transform: translateY(-8px); opacity: 1; }
            100% { transform: translateY(0px); opacity: 0.5; }
          }
          .animate-float {
            animation-name: float;
            animation-timing-function: ease-in-out;
            animation-iteration-count: infinite;
          }
        `}
      </style>
    </div>
  );
};

export default Loading;
