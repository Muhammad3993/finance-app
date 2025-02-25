interface IProps {
  width?: number;
  height?: number;
  fill?: string;
}

const Heart = (props: IProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.width || 33}
    height={props.height || 33}
    viewBox="0 0 33 33"
    fill="none"
  >
    <g>
      <path
        fill={props.fill || "#fff"}
        d="M16.01 29.72c.281 0 .683-.187.978-.361 7.54-4.822 12.321-10.433 12.321-16.139 0-4.74-3.254-8.09-7.46-8.09-2.611 0-4.62 1.447-5.839 3.657-1.192-2.196-3.228-3.656-5.84-3.656-4.205 0-7.46 3.348-7.46 8.09 0 5.705 4.782 11.316 12.336 16.138.281.174.683.361.964.361Z"
      />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M2.71 4.314h26.598V29.72H2.71z" />
      </clipPath>
    </defs>
  </svg>
);
export default Heart;
