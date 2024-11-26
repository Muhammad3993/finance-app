const Necessary = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={32}
    height={32}
    fill="none"
  >
    <g>
      <rect width={32} height={32} fill="#404040" fillOpacity={0.25} rx={16} />
      <g clipPath="url(#b)">
        <path
          fill="#404040"
          fillRule="evenodd"
          d="M20.559 24.686h-7.835c-1.967 0-3.323-1.172-3.566-3.064-.418-3.08-.402-7.81.059-11.216.36-2.62 2.243-3.75 5.164-3.675 2.151.05 4.177.326 6.17.82 1.665.41 2.552 1.432 2.552 2.963l-.008 11.66c0 1.574-.954 2.512-2.536 2.512Zm-8.714-11.242c0 .31.26.56.578.56h7.315a.57.57 0 0 0 .578-.56.579.579 0 0 0-.578-.578h-7.315a.579.579 0 0 0-.578.578Zm0 2.863c0 .31.26.56.578.56h7.315a.57.57 0 0 0 .578-.56c0-.31-.26-.57-.578-.57h-7.315a.577.577 0 0 0-.578.57Zm0 2.854c0 .327.26.578.578.578h7.315a.573.573 0 0 0 .578-.578.57.57 0 0 0-.578-.56h-7.315a.57.57 0 0 0-.578.56Z"
          clipRule="evenodd"
        />
      </g>
    </g>
    <defs>
      <clipPath id="b">
        <path fill="#fff" d="M8.857 6.714h14.246v17.972H8.857z" />
      </clipPath>
      <filter
        id="a"
        width={232}
        height={232}
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
          result="effect1_backgroundBlur_621_3036"
        />
        <feBlend
          in="SourceGraphic"
          in2="effect1_backgroundBlur_621_3036"
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
        <feBlend in2="shape" result="effect2_innerShadow_621_3036" />
      </filter>
    </defs>
  </svg>
)
export default Necessary