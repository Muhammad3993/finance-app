const Saving = () => (
  <svg xmlns='http://www.w3.org/2000/svg' width={32} height={32} fill='none'>
    <g>
      <rect width={32} height={32} fill='#404040' fillOpacity={0.25} rx={16} />
      <g>
        <path
          fill='#404040'
          d='M16.025 17.373c4.83 0 8.613-1.741 8.613-3.96 0-2.142-3.783-3.842-8.613-3.842-4.821 0-8.596 1.7-8.596 3.843 0 2.218 3.775 3.959 8.596 3.959Zm0 5.357c4.863 0 8.613-2.176 8.613-4.847v-1.967c-1.649 1.633-4.947 2.604-8.613 2.604-3.641 0-6.94-.963-8.596-2.604v1.967c0 2.67 3.741 4.847 8.596 4.847Z'
        />
      </g>
    </g>
    <defs>
      <clipPath id='b'>
        <path fill='#fff' d='M7.429 9.571h17.21v13.167H7.429z' />
      </clipPath>
      <filter
        id='a'
        width={232}
        height={232}
        x={-100}
        y={-100}
        colorInterpolationFilters='sRGB'
        filterUnits='userSpaceOnUse'
      >
        <feFlood floodOpacity={0} result='BackgroundImageFix' />
        <feGaussianBlur in='BackgroundImageFix' stdDeviation={50} />
        <feComposite
          in2='SourceAlpha'
          operator='in'
          result='effect1_backgroundBlur_621_3074'
        />
        <feBlend
          in='SourceGraphic'
          in2='effect1_backgroundBlur_621_3074'
          result='shape'
        />
        <feColorMatrix
          in='SourceAlpha'
          result='hardAlpha'
          values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
        />
        <feOffset dy={-4} />
        <feGaussianBlur stdDeviation={12} />
        <feComposite in2='hardAlpha' k2={-1} k3={1} operator='arithmetic' />
        <feColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.12 0' />
        <feBlend in2='shape' result='effect2_innerShadow_621_3074' />
      </filter>
    </defs>
  </svg>
);
export default Saving;
