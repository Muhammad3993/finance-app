interface IProps {
  fill?: string;
  width?: number;
  height?: number;
}
const Plus = (props: IProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.width || 28}
    height={props.height || 28}
    viewBox="0 0 28 28"
    fill="none"
  >
    <path
      fill={props.fill || "#fff"}
      d="M4 14a1.09 1.09 0 0 0 1.079 1.079h7.842v7.842A1.09 1.09 0 0 0 14 24a1.1 1.1 0 0 0 1.091-1.079V15.08h7.83c.582 0 1.079-.485 1.079-1.079a1.1 1.1 0 0 0-1.079-1.09h-7.83V5.078A1.1 1.1 0 0 0 14 4a1.09 1.09 0 0 0-1.079 1.079v7.83H5.08A1.1 1.1 0 0 0 4 14Z"
    />
  </svg>
);
export default Plus;
