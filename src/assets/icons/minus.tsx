interface IProps {
  fill?: string;
}

const Minus = (props: IProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="none">
    <path
      fill={props.fill || "#fff"}
      d="M3.2 8c0 .285.239.518.518.518h8.564c.28 0 .518-.233.518-.518a.528.528 0 0 0-.518-.523H3.718A.528.528 0 0 0 3.2 8Z"
    />
  </svg>
);
export default Minus;
