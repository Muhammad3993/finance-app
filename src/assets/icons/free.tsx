const Free = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={48}
    height={48}
    fill='none'
  >
    <g fill='#404040'>
      <rect width={48} height={48} fillOpacity={0.25} rx={12} />
      <path d='M16.034 28.387c0 .129.07.193.19.193h6.165c-.835-.868-1.324-2.403-1.324-4.348 0-1.938.489-3.465 1.309-4.325h-6.15c-.12 0-.19.064-.19.193v8.287Zm5.977-4.155c0 2.507.852 4.187 2.137 4.187 1.325 0 2.216-1.68 2.216-4.188 0-2.507-.891-4.18-2.216-4.18-1.285 0-2.137 1.673-2.137 4.18Zm3.943 4.348h6.182c.118 0 .189-.064.189-.193V20.1c0-.129-.071-.193-.19-.193h-6.173c.843.86 1.34 2.387 1.34 4.325 0 1.945-.505 3.48-1.348 4.348Z' />
      <path d='M13.862 30.119c0 .377.25.63.625.63H33.88c.375 0 .617-.253.617-.63V18.36c0-.378-.242-.622-.617-.622H14.486c-.375 0-.625.244-.625.622v11.758Zm1.43-1.291v-9.169c0-.314.18-.48.47-.48h16.836c.297 0 .469.166.469.48v9.169c0 .307-.172.48-.47.48H15.762c-.289 0-.469-.173-.469-.48Z' />
    </g>
    <defs>
      <filter
        id='a'
        width={248}
        height={248}
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
          result='effect1_backgroundBlur_798_4762'
        />
        <feBlend
          in='SourceGraphic'
          in2='effect1_backgroundBlur_798_4762'
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
        <feBlend in2='shape' result='effect2_innerShadow_798_4762' />
      </filter>
    </defs>
  </svg>
);
export default Free;
