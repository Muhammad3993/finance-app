interface IProps {
  width?: number;
  height?: number;
}
const Symbol = (props: IProps) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={props.width || 40}
    height={props.height || 40}
    viewBox="0 0 40 40"
    fill='none'
  >
    <g>
      <path
        fill='#404040'
        d='M19.933 37.009c9.342 0 17.076-7.751 17.076-17.076 0-9.341-7.751-17.076-17.093-17.076-9.325 0-17.059 7.734-17.059 17.076 0 9.325 7.751 17.076 17.076 17.076Z'
      />
      <path
        fill='#fff'
        d='M18.058 28.12c-.57 0-1.038-.235-1.473-.82l-4.202-5.157c-.251-.335-.402-.703-.402-1.088 0-.754.586-1.373 1.34-1.373.485 0 .853.15 1.272.703l3.398 4.386 7.149-11.484c.318-.502.753-.77 1.188-.77.737 0 1.423.502 1.423 1.289 0 .368-.218.753-.418 1.105l-7.869 12.388c-.351.553-.837.82-1.406.82Z'
      />
    </g>
    <defs>
      <clipPath id='a'>
        <path fill='#fff' d='M2.857 2.857H37.01v34.17H2.857z' />
      </clipPath>
    </defs>
  </svg>
);
export default Symbol;
