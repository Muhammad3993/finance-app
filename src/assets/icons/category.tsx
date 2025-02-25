interface IProps {
  fill?: string;
}
const Category = (props: IProps) => (
  <svg xmlns='http://www.w3.org/2000/svg' width={25} height={24} fill='none'>
    <g>
      <path
        fill={props.fill || '#404040'}
        d='m13.384 21.21 8.728-8.746c.672-.67.716-1.056.716-1.996V7.067c0-.95-.223-1.245-.904-1.925l-2.059-2.059c-.671-.671-.966-.904-1.915-.904h-3.41c-.94 0-1.317.045-1.988.716l-8.755 8.737c-1.28 1.28-1.307 2.605.01 3.912L9.472 21.2c1.316 1.307 2.631 1.29 3.911.01Zm3.062-11.87a1.206 1.206 0 0 1-1.226-1.226 1.2 1.2 0 0 1 1.226-1.226c.698 0 1.226.537 1.226 1.226 0 .68-.528 1.226-1.226 1.226Z'
      />
    </g>
    <defs>
      <clipPath id='a'>
        <path fill='#fff' d='M2.828 1.276h20v20.9h-20z' />
      </clipPath>
    </defs>
  </svg>
);
export default Category;
