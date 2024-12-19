import clsx from "clsx";

interface IProps {
  isText?: boolean;
  text?: string;
  leftIconBoxClass?: string;
  leftIconBoxClick?: () => void;
  leftIcon?: React.ReactElement;
  rightIconBoxClass?: string;
  rightIconBoxClick?: () => void;
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
    rightIconBoxClick,
    rightIcon,
  } = props;
  return (
    <div className='px-4 flex justify-between items-center h-12 my-2 fixed top-0 left-0 right-0 backdrop-blur-50 bg-FFFFFF-8'>
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
        onClick={rightIconBoxClick}
      >
        {rightIcon}
      </div>
    </div>
  );
};

export default UserNavbar;
