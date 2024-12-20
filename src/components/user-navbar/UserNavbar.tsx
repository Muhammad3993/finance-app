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
    <>
      <div className='fixed top-[-10px] left-0 right-0'>
        <div className={clsx("w-full h-[70px] backdrop-blur-50")}></div>
        <div className='px-4 flex justify-between items-center h-12 my-2 backdrop-blur-50 relative top-[-10px]'>
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
      </div>
      <div className="h-[110px]"></div>
    </>
  );
};

export default UserNavbar;
