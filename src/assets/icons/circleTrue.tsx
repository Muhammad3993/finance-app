const CircleTrue = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={40}
    height={40}
    fill="none"
  >
    <g>
      <rect
        width={38}
        height={38}
        x={1}
        y={1}
        stroke="#fff"
        strokeOpacity={0.25}
        strokeWidth={2}
        rx={19}
      />
      <path
        fill="#fff"
        fillOpacity={0.25}
        d="M18.395 27c-.505 0-.922-.21-1.308-.736l-3.73-4.627c-.223-.3-.357-.63-.357-.976 0-.676.52-1.232 1.189-1.232.431 0 .758.135 1.13.631l3.016 3.936 6.347-10.305c.282-.45.668-.691 1.055-.691.654 0 1.263.45 1.263 1.157 0 .33-.193.676-.372.991l-6.985 11.116c-.312.496-.743.736-1.248.736Z"
      />
    </g>
    <defs>
      <filter
        id="a"
        width={240}
        height={240}
        x={-100}
        y={-100}
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feGaussianBlur in="BackgroundImageFix" stdDeviation={50} />
        <feComposite
          in2="SourceAlpha"
          operator="in"
          result="effect1_backgroundBlur_1362_5722"
        />
        <feBlend
          in="SourceGraphic"
          in2="effect1_backgroundBlur_1362_5722"
          result="shape"
        />
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset dy={-4} />
        <feGaussianBlur stdDeviation={12} />
        <feComposite in2="hardAlpha" k2={-1} k3={1} operator="arithmetic" />
        <feColorMatrix values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.12 0" />
        <feBlend in2="shape" result="effect2_innerShadow_1362_5722" />
      </filter>
    </defs>
  </svg>
);
export default CircleTrue;
