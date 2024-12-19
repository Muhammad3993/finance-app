interface IProps {
  fill?: string;
}

const Chart = (props: IProps) => (
  <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none'>
    <g>
      <path
        fill={props.fill || '#404040'}
        d='M11.96 22.195c2.41 0 4.74-.864 6.6-2.44l-7.233-7.092c-.2-.18-.241-.352-.241-.623V1.744c-5.213.452-9.372 4.902-9.372 10.206 0 5.605 4.65 10.245 10.246 10.245ZM22.205 11.95a10.18 10.18 0 0 0-1.004-4.37l-8.207 4.721 6.56 6.48a10.215 10.215 0 0 0 2.651-6.831Zm-9.773-.884 8.106-4.66c-1.748-2.743-4.912-4.561-8.106-4.692v9.352Z'
      />
    </g>
    <defs>
      <clipPath id='a'>
        <path fill='#fff' d='M1.714 1.714h20.491v20.481H1.715z' />
      </clipPath>
    </defs>
  </svg>
);
export default Chart;
