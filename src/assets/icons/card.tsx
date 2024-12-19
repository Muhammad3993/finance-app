interface IProps {
  width?: number;
  height?: number;
  fill?: string;
}
const Card = (props: IProps) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={props.width || 24}
    height={props.height || 24}
    viewBox="0 0 24 24"
    fill='none'
  >
    <g>
      <path
        fill={props.fill || '#404040'}
        d='M4.108 17.481c-.592 0-.984-.402-.984-.964v-1.858c0-.573.392-.965.984-.965H6.57c.593 0 .985.392.985.964v1.859c0 .562-.392.964-.985.964H4.11ZM0 9.767v-2.28h23.605v2.28H0Zm3.154 10.828h17.297c2.11 0 3.154-1.035 3.154-3.104V6.552c0-2.069-1.045-3.113-3.154-3.113H3.154C1.054 3.439 0 4.483 0 6.552v10.939c0 2.07 1.055 3.104 3.154 3.104Z'
      />
    </g>
    <defs>
      <clipPath id='a'>
        <path fill='#fff' d='M0 3.429h23.605v17.166H0z' />
      </clipPath>
    </defs>
  </svg>
);
export default Card;
