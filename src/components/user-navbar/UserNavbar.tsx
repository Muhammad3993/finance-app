import clsx from "clsx";

interface IProps {
  isText?: boolean;
  text?: string;
  leftIconBoxClass?: string;
  leftIconBoxClick?: () => void;
  leftIcon?: React.ReactElement;
  rightIconBoxClass?: string;
  rightIcon?: React.ReactElement;
}

const UserNavbar = (props: IProps) => {
  const {
    isText,
    text,
    leftIconBoxClass,
    leftIconBoxClick,
    leftIcon,
    rightIconBoxClass,
    rightIcon,
  } = props;
  return (
    <div className='px-4 flex justify-between items-center h-12 my-2'>
      <div
        className={clsx(
          "w-12 h-full bg-customGray flex items-center justify-center rounded-full",
          leftIconBoxClass,
        )}
        onClick={leftIconBoxClick}
      >
        {leftIcon}
      </div>
      {isText && (
        <div>
          <p className='text-sm font-semibold font-unbounded text-customGray2'>
            {text}
          </p>
        </div>
      )}
      <div
        className={clsx(
          "w-12 h-full bg-customGray flex items-center justify-center rounded-full",
          rightIconBoxClass,
        )}
      >
        {rightIcon}
      </div>
    </div>
  );
};

export default UserNavbar;
