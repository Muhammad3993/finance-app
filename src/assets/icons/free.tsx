const Free = () => (
  <svg xmlns='http://www.w3.org/2000/svg' width={32} height={32} fill='none'>
    <g fill='#404040'>
      <rect width={32} height={32} fillOpacity={0.25} rx={16} />
      <path d='M8.714 19.822c0 .119.066.178.175.178h5.677c-.77-.8-1.22-2.217-1.22-4.011 0-1.787.45-3.196 1.206-3.989H8.889c-.11 0-.175.06-.175.178v7.644Zm5.504-3.833c0 2.313.784 3.863 1.967 3.863 1.22 0 2.04-1.55 2.04-3.863 0-2.313-.82-3.856-2.04-3.856-1.183 0-1.967 1.543-1.967 3.856ZM17.848 20h5.692c.109 0 .174-.06.174-.178v-7.644c0-.119-.065-.178-.174-.178h-5.685c.777.793 1.234 2.202 1.234 3.989 0 1.794-.464 3.21-1.241 4.011Z' />
      <path d='M6.714 21.42c0 .348.23.58.576.58h17.856c.345 0 .568-.232.568-.58V10.572c0-.348-.223-.573-.568-.573H7.29c-.345 0-.576.225-.576.573V21.42Zm1.317-1.191V11.77c0-.29.166-.443.432-.443h15.502c.274 0 .432.153.432.443v8.458c0 .283-.158.443-.432.443H8.463c-.266 0-.432-.16-.432-.443Z' />
    </g>
    <defs>
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
          result='effect1_backgroundBlur_621_3065'
        />
        <feBlend
          in='SourceGraphic'
          in2='effect1_backgroundBlur_621_3065'
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
        <feBlend in2='shape' result='effect2_innerShadow_621_3065' />
      </filter>
    </defs>
  </svg>
);
export default Free;
