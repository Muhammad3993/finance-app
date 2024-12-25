interface IProps {
  fill?: string;
}

const DateIcon = (props: IProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={25} height={24} fill="none">
    <g>
      <path
        fill={props.fill || "#404040"}
        d="M6.175 20.912h13.16c2.013 0 3.015-1.044 3.015-3.114V5.534c0-2.07-1.002-3.114-3.015-3.114H6.175c-2.013 0-3.025 1.035-3.025 3.114v12.264c0 2.08 1.012 3.114 3.025 3.114Zm-.144-1.617c-.858 0-1.33-.472-1.33-1.406V8.417c0-.924.472-1.406 1.33-1.406H19.46c.857 0 1.339.482 1.339 1.406v9.472c0 .934-.482 1.406-1.34 1.406H6.032Zm4.845-8.679h.569c.337 0 .443-.1.443-.451v-.593c0-.352-.106-.462-.443-.462h-.569c-.337 0-.452.11-.452.462v.593c0 .351.115.452.452.452Zm3.199 0h.568c.337 0 .453-.1.453-.451v-.593c0-.352-.116-.462-.453-.462h-.568c-.337 0-.453.11-.453.462v.593c0 .351.116.452.453.452Zm3.198 0h.568c.338 0 .453-.1.453-.451v-.593c0-.352-.115-.462-.453-.462h-.568c-.337 0-.443.11-.443.462v.593c0 .351.106.452.443.452Zm-9.595 3.285h.559c.346 0 .452-.1.452-.452v-.592c0-.352-.106-.452-.452-.452h-.56c-.346 0-.452.1-.452.452v.592c0 .352.106.452.453.452Zm3.198 0h.569c.337 0 .443-.1.443-.452v-.592c0-.352-.106-.452-.443-.452h-.569c-.337 0-.452.1-.452.452v.592c0 .352.115.452.452.452Zm3.199 0h.568c.337 0 .453-.1.453-.452v-.592c0-.352-.116-.452-.453-.452h-.568c-.337 0-.453.1-.453.452v.592c0 .352.116.452.453.452Zm3.198 0h.568c.338 0 .453-.1.453-.452v-.592c0-.352-.115-.452-.453-.452h-.568c-.337 0-.443.1-.443.452v.592c0 .352.106.452.443.452Zm-9.595 3.295h.559c.346 0 .452-.11.452-.462v-.593c0-.351-.106-.452-.452-.452h-.56c-.346 0-.452.1-.452.452v.593c0 .351.106.462.453.462Zm3.198 0h.569c.337 0 .443-.11.443-.462v-.593c0-.351-.106-.452-.443-.452h-.569c-.337 0-.452.1-.452.452v.593c0 .351.115.462.452.462Zm3.199 0h.568c.337 0 .453-.11.453-.462v-.593c0-.351-.116-.452-.453-.452h-.568c-.337 0-.453.1-.453.452v.593c0 .351.116.462.453.462Z"
      />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M3.15 2.4h19.2v18.512H3.15z" />
      </clipPath>
    </defs>
  </svg>
);
export default DateIcon;
