interface IProps {
  fill?: string;
}
const User = (props: IProps) => (
  <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none'>
    <path
      fill={props.fill || '#404040'}
      d='M4.917 20.947c-.631 0-.917-.406-.917-.977 0-1.684 2.556-6.09 8-6.09s8 4.406 8 6.09c0 .571-.286.977-.917.977H4.917ZM12 12.602c-2.195-.016-3.985-1.865-3.985-4.361C8.015 5.925 9.805 4 12 4c2.196 0 3.985 1.925 3.985 4.24 0 2.497-1.79 4.377-3.985 4.361Z'
    />
  </svg>
);
export default User;