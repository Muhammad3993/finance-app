interface IProps {
  fill?: string;
}
const ArrowLeftShort = (props: IProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none">
    <g clipPath="url(#a)">
      <path
        fill={props.fill || "#fff"}
        d="M6.311 12.572c-.2-.19-.311-.422-.311-.673 0-.251.11-.482.311-.673l6.65-6.64c.221-.22.432-.3.673-.3.492 0 .884.36.884.863 0 .241-.09.472-.251.633l-2.25 2.29L8.328 12l3.689 3.726 2.25 2.29a.88.88 0 0 1 .25.633c0 .502-.39.864-.883.864-.241 0-.452-.09-.653-.281l-6.67-6.66Z"
      />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M2.571 4.285h18.653v15.238H2.571z" />
      </clipPath>
    </defs>
  </svg>
);
export default ArrowLeftShort;
