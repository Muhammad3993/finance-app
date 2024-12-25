interface IProps {
  width?: number;
  height?: number;
  fill?: string;
}

const Cash = (props: IProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.width || 32}
    height={props.height || 33}
    viewBox="0 0 32 33"
    fill="none"
  >
    <path
      fill={props.fill || "#fff"}
      d="M25.6 10.1h-20v-.8l17.6-1.408V9.3h2.4V6.9c0-1.76-1.426-2.995-3.166-2.747L6.368 6.447C4.626 6.697 3.2 8.34 3.2 10.1v16a3.2 3.2 0 0 0 3.2 3.2h19.2a3.2 3.2 0 0 0 3.2-3.2V13.3a3.2 3.2 0 0 0-3.2-3.2Zm-2.4 11.21a2.4 2.4 0 1 1 .001-4.8 2.4 2.4 0 0 1-.001 4.8Z"
    />
  </svg>
);
export default Cash;
