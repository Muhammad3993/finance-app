import { memo } from "react";

interface IProps {
  width?: number;
  height?: number;
  fill?: string;
}

const Edit = (props: IProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.width || 16}
    height={props.height || 16}
    viewBox="0 0 16 16"
    fill="none"
  >
    <g>
      <path
        fill={props.fill || "#fff"}
        fillOpacity={0.8}
        d="M1.143 12.066c0 1.386.71 2.075 2.103 2.075h7.66c1.4 0 2.103-.69 2.103-2.075V4.35c0-1.38-.703-2.076-2.103-2.076h-7.66c-1.393 0-2.103.697-2.103 2.076v7.715Zm2.123-8.712h7.627c.67 0 1.038.361 1.038 1.058v7.6c0 .696-.368 1.051-1.038 1.051H3.266c-.67 0-1.045-.355-1.045-1.051v-7.6c0-.697.375-1.058 1.045-1.058Z"
      />
      <path
        fill="#1B1A1E"
        fillOpacity={0.5}
        d="m6.045 10.645 1.466-.643 7.36-7.373a1.435 1.435 0 0 0 0-2.062L14.71.413c-.563-.57-1.467-.542-2.043.033L5.322 7.792l-.67 1.4c-.414.864.496 1.835 1.394 1.453Z"
      />
      <path
        fill={props.fill || "#fff"}
        fillOpacity={0.8}
        d="m5.683 9.802 1.306-.57 6.254-6.247-.917-.904-6.248 6.248-.603 1.259c-.053.113.08.267.208.214Zm8.056-7.306.482-.495c.228-.242.228-.563 0-.784l-.154-.16c-.208-.208-.536-.181-.757.033l-.489.482.918.924Z"
      />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M1.143 0h14.165v15.98H1.143z" />
      </clipPath>
    </defs>
  </svg>
);
const EditIcon = memo(Edit);
export default EditIcon;
