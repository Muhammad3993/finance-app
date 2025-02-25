interface IProps {
  fill?: string;
}

const CloseIcon = (props: IProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none">
    <g fill={props.fill || "#000"}>
      <path
        fillOpacity={0.04}
        d="M12 24c6.565 0 12-5.447 12-12 0-6.565-5.447-12-12.012-12C5.435 0 0 5.435 0 12c0 6.553 5.447 12 12 12Z"
      />
      <path
        fillOpacity={0.8}
        d="M7.862 17.143a1.005 1.005 0 0 1-1.005-1.019c0-.27.098-.528.294-.712L10.547 12 7.151 8.6a.984.984 0 0 1-.294-.712.987.987 0 0 1 1.005-1.006c.282 0 .503.098.7.282l3.42 3.412 3.445-3.424a.927.927 0 0 1 .698-.295c.564 0 1.018.442 1.018 1.007a.95.95 0 0 1-.307.724L13.428 12l3.396 3.4a.938.938 0 0 1 .306.724c0 .565-.453 1.019-1.03 1.019a.97.97 0 0 1-.723-.295l-3.395-3.412-3.384 3.412a1.017 1.017 0 0 1-.736.295Z"
        opacity={0.5}
      />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default CloseIcon;
