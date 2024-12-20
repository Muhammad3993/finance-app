import { useUserContext } from "@/context/UserContext";
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

  const { isScrolled } = useUserContext();

  return (
    <>
      <div
        className={clsx(
          "fixed top-[-10px] left-0 right-0 duration-300 border-b border-transparent ",
          isScrolled && "bg-1B1A1E-80 border-b border-1B1A1E-100 backdrop-blur-[100px]",
        )}
        id='user-navbar'
      >
        <div className='w-full h-[109px]'></div>
        <div className='px-4 flex justify-between items-center h-12 relative'>
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
      <div className='h-[110px]'></div>
    </>
  );
};

export default UserNavbar;
