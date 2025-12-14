const ZigZag = () => {
  return (
    <div className="absolute -bottom-35 left-1/2 -translate-x-1/2 mx-5 lg:block hidden">
      <svg
        width="1300"
        height="450"
        viewBox="-100 -150 1300 450"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M -76 300 L 20 300"
          fill="none"
          stroke="white"
          stroke-width="15"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="flow-line-left-end"
        />

        <path
          d="
     M 20 300
            L 265 300
            L 265 100  L 815 100  L 815 -5   L 1060 -5
    "
          fill="none"
          stroke="white"
          stroke-width="1"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="flow-line-middle"
        />

        <path
          d="M 1060 -5 L 1151 -5"
          fill="none"
          stroke="white"
          stroke-width="10"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="flow-line-right-end"
        />
      </svg>
    </div>
  );
};

export default ZigZag;
